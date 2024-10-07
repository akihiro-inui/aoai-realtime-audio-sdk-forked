// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Player } from "./player.ts";
import { Recorder } from "./recorder.ts";
import "./style.css";
import { LowLevelRTClient, SessionUpdateMessage } from "rt-client";
import { AssistantService } from "./services.ts";

let realtimeStreaming: LowLevelRTClient;
let audioRecorder: Recorder;
let audioPlayer: Player;
let assistantService = new AssistantService();

async function start_realtime(endpoint: string, apiKey: string, deploymentOrModel: string) {
  if (isAzureOpenAI()) {
    realtimeStreaming = new LowLevelRTClient(new URL(endpoint), { key: apiKey }, { deployment: deploymentOrModel });
  } else {
    realtimeStreaming = new LowLevelRTClient({ key: apiKey }, { model: deploymentOrModel });
  }

  try {
    console.log("sending session config");
    await realtimeStreaming.send(createConfigMessage());
  } catch (error) {
    console.log(error);
    makeNewTextBlock("[Connection error]: Unable to send initial config message. Please check your endpoint and authentication details.");
    setFormInputState(InputState.ReadyToStart);
    return;
  }
  console.log("sent");
  await Promise.all([resetAudio(true), handleRealtimeMessages()]);
}

function createConfigMessage(): SessionUpdateMessage {
  let configMessage: SessionUpdateMessage = {
    type: "session.update",
    session: {
      turn_detection: {
        type: "server_vad",
      },
      input_audio_transcription: {
        model: "whisper-1",
      },
      tools: [
        {
          "type": "function",
          "name": "music_controller",
          "description": "Controls the music player in the car. You can play, pause, stop, skip to the next track, go back to the previous track, or turn up/down the volume.",
          "parameters": {
            "type": "object",
            "properties": {
              "action": {
                "type": "string",
                "description": "The action for the music player control. It can play, pause, stop, next, previous, or adjust the volume.",
              },
            },
            "required": ["action"]
          }
        },
        {
          "type": "function",
          "name": "car_windows_controller",
          "description": "Opens specified car windows to allow fresh air into the vehicle or improve ventilation. You can choose to open individual windows or all windows at once.",
          "parameters": {
            "type": "object",
            "properties": {
              "window_positions": {
                "type": "array",
                "description": "A list of window positions to adjust. Possible values include 'front_left', 'front_right', 'rear_left', 'rear_right', or 'all'.",
                "items": {
                  "type": "string",
                  "enum": ["front_left", "front_right", "rear_left", "rear_right", "all"]
                }
              },
              "action": {
                "type": "string",
                "description": "The action for the car windows control. It can open or close the windows.",
              },
            },
            "required": ["window_positions"]
          }
        },
        {
          "type": "function",
          "name": "set_navigation_destination",
          "description": "Sets the destination in the car's navigation system. This function updates the GPS to guide you to the specified address or point of interest.",
          "parameters": {
            "type": "object",
            "properties": {
              "destination": {
                "type": "string",
                "description": "The address or name of the destination to set in the navigation system."
              }
            },
            "required": ["destination"]
          }
        },
        {
          "type": "function",
          "name": "get_car_length",
          "description": "Retrieves the total length of the car. This information is useful for parking, garage storage, or transport considerations.",
          "parameters": {
            "type": "object",
            "properties": {
              "car_name": {
                "type": "string",
                "description": "The name of the car model to get the length of."
              }
            },
            "required": ["car_name"]
          }
        },
        {
          "type": "function",
          "name": "get_seating_capacity",
          "description": "Retrieves the maximum number of occupants the car can accommodate, including the driver and passengers.",
          "parameters": {
            "type": "object",
            "properties": {
              "car_name": {
                "type": "string",
                "description": "The name of the car model to get the seating capacity of."
              },
            },
            "required": ["car_name"]
          }
        },
        {
          "type": "function",
          "name": "get_fuel_type",
          "description": "Retrieves the type of fuel the car uses, such as gasoline, diesel, electric, or hybrid. This information is important for refueling and energy considerations.",
          "parameters": {
            "type": "object",
            "properties": {
              "car_name": {
                "type": "string",
                "description": "The name of the car model to get the fuel type of."
              },
            },
            "required": ["car_name"]
          }
        }
      ]
    },
  };

  const systemMessage = getSystemMessage();
  const temperature = getTemperature();
  const voice = getVoice();

  if (systemMessage) {
    configMessage.session.instructions = systemMessage;
  }
  if (!isNaN(temperature)) {
    configMessage.session.temperature = temperature;
  }
  if (voice) {
    configMessage.session.voice = voice;
  }

  return configMessage;
}

async function handleRealtimeMessages() {
  for await (const message of realtimeStreaming.messages()) {
    switch (message.type) {
      case "session.created":
        console.log(JSON.stringify(message, null, 2));
        setFormInputState(InputState.ReadyToStop);
        makeNewTextBlock("<< Session Started >>");
        makeNewTextBlock();
        break;
      case "conversation.item.created":
        if (message.item.type === "message" && message.item.role === "user" && message.item.content[0].type === "input_text") {
          // Log message ID as a simple implementation
          console.log(`Message ID: ${message.item.id}`);
        }
        break;
      case "response.content_part.added":
        makeNewTextBlock();
        appendToTextBlock("Assistant: ");
        break;
      case "response.audio_transcript.delta":
        appendToTextBlock(message.delta);
        formReceivedTextContainer.scrollTo(0, formReceivedTextContainer.scrollHeight);
        break;
      case "response.audio.delta":
        const binary = atob(message.delta);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const pcmData = new Int16Array(bytes.buffer);
        audioPlayer.play(pcmData);
        break;
      case "input_audio_buffer.speech_started":
        makeNewTextBlock("");
        let textElements = formReceivedTextContainer.children;
        latestInputSpeechBlock = textElements[textElements.length - 1];
        makeNewTextBlock();
        audioPlayer.clear();
        break;
      case "conversation.item.input_audio_transcription.completed":
        latestInputSpeechBlock.textContent += 
        `User (Speech): ${message.transcript.replace(/[\n\r]+/g, '')} >> ${message.item_id}`;
        latestInputSpeechBlock.id = message.item_id;
        break;
      case "response.done":
        // Using any to process outputs
        (message.response.output as any[]).forEach(async (output: any) => {
          if (output.type === 'function_call') {
            // Log the function call details
            console.log(`Function call detected: ${JSON.stringify(output, null, 2)}`);

            // Placeholder response as assistantService is not available
            let response = await assistantService.getToolResponse(output.name, output.arguments, output.call_id);
            console.log(JSON.stringify(response, null, 2));
            if (response.type == 'session.update') {
              response.session.voice = getVoice();
              response.session.temperature = getTemperature();
            }
            // Send the placeholder response
            realtimeStreaming.send(response);
            realtimeStreaming.send({ type: 'response.create' });
          } else if (output.type === 'message') {
            // Simple logging for message ID
            console.log(`Message ID: ${output.id}`);
            formReceivedTextContainer.appendChild(document.createElement("hr"));
          }
        });
        break;
      case "error":
        console.log(JSON.stringify(message, null, 2));
        break;
      default:
        break;
    }
  }
  resetAudio(false);
}


/**
 * Basic audio handling
 */

let recordingActive: boolean = false;
let buffer: Uint8Array = new Uint8Array();

function combineArray(newData: Uint8Array) {
  const newBuffer = new Uint8Array(buffer.length + newData.length);
  newBuffer.set(buffer);
  newBuffer.set(newData, buffer.length);
  buffer = newBuffer;
}

function processAudioRecordingBuffer(data: Buffer) {
  const uint8Array = new Uint8Array(data);
  combineArray(uint8Array);
  if (buffer.length >= 4800) {
    const toSend = new Uint8Array(buffer.slice(0, 4800));
    buffer = new Uint8Array(buffer.slice(4800));
    const regularArray = String.fromCharCode(...toSend);
    const base64 = btoa(regularArray);
    if (recordingActive) {
      realtimeStreaming.send({
        type: "input_audio_buffer.append",
        audio: base64,
      });
    }
  }
}

async function resetAudio(startRecording: boolean) {
  recordingActive = false;
  if (audioRecorder) {
    audioRecorder.stop();
  }
  if (audioPlayer) {
    audioPlayer.clear();
  }
  audioRecorder = new Recorder(processAudioRecordingBuffer);
  audioPlayer = new Player();
  audioPlayer.init(24000);
  if (startRecording) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioRecorder.start(stream);
    recordingActive = true;
  }
}

/**
 * UI and controls
 */

const formReceivedTextContainer = document.querySelector<HTMLDivElement>(
  "#received-text-container"
)!;
const formStartButton =
  document.querySelector<HTMLButtonElement>("#start-recording")!;
const formStopButton =
  document.querySelector<HTMLButtonElement>("#stop-recording")!;
const formEndpointField =
  document.querySelector<HTMLInputElement>("#endpoint")!;
const formAzureToggle =
  document.querySelector<HTMLInputElement>("#azure-toggle")!;
const formApiKeyField = document.querySelector<HTMLInputElement>("#api-key")!;
const formDeploymentOrModelField = document.querySelector<HTMLInputElement>(
  "#deployment-or-model"
)!;
const formSessionInstructionsField =
  document.querySelector<HTMLTextAreaElement>("#session-instructions")!;
const formTemperatureField = document.querySelector<HTMLInputElement>("#temperature")!;
const formVoiceSelection = document.querySelector<HTMLInputElement>("#voice")!;

let latestInputSpeechBlock: Element;

enum InputState {
  Working,
  ReadyToStart,
  ReadyToStop,
}

function isAzureOpenAI(): boolean {
  return formAzureToggle.checked;
}

function guessIfIsAzureOpenAI() {
  const endpoint = (formEndpointField.value || "").trim();
  formAzureToggle.checked = endpoint.indexOf("azure") > -1;
}

function setFormInputState(state: InputState) {
  formEndpointField.disabled = state != InputState.ReadyToStart;
  formApiKeyField.disabled = state != InputState.ReadyToStart;
  formDeploymentOrModelField.disabled = state != InputState.ReadyToStart;
  formStartButton.disabled = state != InputState.ReadyToStart;
  formStopButton.disabled = state != InputState.ReadyToStop;
  formSessionInstructionsField.disabled = state != InputState.ReadyToStart;
  formAzureToggle.disabled = state != InputState.ReadyToStart;
}

function getSystemMessage(): string {
  return formSessionInstructionsField.value || "";
}

function getTemperature(): number {
  return parseFloat(formTemperatureField.value);
}

function getVoice(): "alloy" | "echo" | "shimmer" {
  return formVoiceSelection.value as "alloy" | "echo" | "shimmer";
}

function makeNewTextBlock(text: string = "") {
  let newElement = document.createElement("p");
  newElement.textContent = text;
  formReceivedTextContainer.appendChild(newElement);
}

function appendToTextBlock(text: string) {
  let textElements = formReceivedTextContainer.children;
  if (textElements.length == 0) {
    makeNewTextBlock();
  }
  textElements[textElements.length - 1].textContent += text;
}

// Save input values to localStorage
function saveInputToLocalStorage() {
  localStorage.setItem("endpoint", formEndpointField.value.trim());
  localStorage.setItem("apiKey", formApiKeyField.value.trim());
  localStorage.setItem("deploymentOrModel", formDeploymentOrModelField.value.trim());
}

// Load saved input values from localStorage
function loadInputFromLocalStorage() {
  const savedEndpoint = localStorage.getItem("endpoint");
  const savedApiKey = localStorage.getItem("apiKey");
  const savedDeploymentOrModel = localStorage.getItem("deploymentOrModel");

  if (savedEndpoint) formEndpointField.value = savedEndpoint;
  if (savedApiKey) formApiKeyField.value = savedApiKey;
  if (savedDeploymentOrModel) formDeploymentOrModelField.value = savedDeploymentOrModel;
}

// Call loadInputFromLocalStorage when the page loads
loadInputFromLocalStorage();

// Update event listeners to save inputs to localStorage
formEndpointField.addEventListener("change", () => {
  guessIfIsAzureOpenAI();
  saveInputToLocalStorage();
});
formApiKeyField.addEventListener("change", saveInputToLocalStorage);
formDeploymentOrModelField.addEventListener("change", saveInputToLocalStorage);

formStartButton.addEventListener("click", async () => {
  setFormInputState(InputState.Working);

  const endpoint = formEndpointField.value.trim();
  const key = formApiKeyField.value.trim();
  const deploymentOrModel = formDeploymentOrModelField.value.trim();

  if (isAzureOpenAI() && !endpoint && !deploymentOrModel) {
    alert("Endpoint and Deployment are required for Azure OpenAI");
    return;
  }

  if (!isAzureOpenAI() && !deploymentOrModel) {
    alert("Model is required for OpenAI");
    return;
  }

  if (!key) {
    alert("API Key is required");
    return;
  }

  try {
    start_realtime(endpoint, key, deploymentOrModel);
  } catch (error) {
    console.log(error);
    setFormInputState(InputState.ReadyToStart);
  }
});

formStopButton.addEventListener("click", () => {
  realtimeStreaming?.send({
    type: "session.stop",
  });
  setFormInputState(InputState.ReadyToStart);
});
