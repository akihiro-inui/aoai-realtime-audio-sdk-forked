// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var MessageItemType = "message";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var isRealtimeEvent = function (message) {
    return typeof message === "object" && message !== null && "type" in message;
};
var isServerMessageType = function (message) {
    return isRealtimeEvent(message) &&
        [
            "error",
            "session.created",
            "session.updated",
            "input_audio_buffer.committed",
            "input_audio_buffer.cleared",
            "input_audio_buffer.speech_started",
            "input_audio_buffer.speech_stopped",
            "conversation.item.created",
            "conversation.item.truncated",
            "conversation.item.deleted",
            "conversation.item.input_audio_transcription.completed",
            "conversation.item.input_audio_transcription.failed",
            "response.created",
            "response.done",
            "response.output_item.added",
            "response.output_item.done",
            "response.content_part.added",
            "response.content_part.done",
            "response.text.delta",
            "response.text.done",
            "response.audio_transcript.delta",
            "response.audio_transcript.done",
            "response.audio.delta",
            "response.audio.done",
            "response.function_call_arguments.delta",
            "response.function_call_arguments.done",
            "rate_limits.updated",
        ].includes(message.type);
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _WS = WebSocket;
var sendMessage = function (socket, message) {
    if (socket.readyState !== WebSocket.OPEN) {
        return Promise.reject(new Error("Socket is not open"));
    }
    socket.send(message);
    return Promise.resolve();
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var validationSuccess = function (message) { return ({
    success: true,
    message: message,
}); };
var validationError = function (error) { return ({
    success: false,
    error: error,
}); };
var isValidatorSuccess = function (result) { return result.success; };
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient(settings, handler) {
        var _this = this;
        this.closedPromise = undefined;
        this.messageQueue = [];
        this.receiverQueue = [];
        this.done = false;
        this.validate = handler.validate;
        this.serialize = handler.serialize;
        this.connectedPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, uri, protocols, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(settings.policy === undefined)) return [3 /*break*/, 1];
                        _b = settings;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, settings.policy(settings)];
                    case 2:
                        _b = _c.sent();
                        _c.label = 3;
                    case 3:
                        _a = _b, uri = _a.uri, protocols = _a.protocols;
                        this.socket = new _WS(uri.toString(), protocols);
                        this.socket.onopen = function () {
                            _this.socket.onmessage = _this.getMessageHandler();
                            _this.closedPromise = new Promise(function (resolve) {
                                _this.socket.onclose = _this.getClosedHandler(resolve);
                            });
                            _this.socket.onerror = _this.handleError;
                            resolve();
                        };
                        this.socket.onerror = function (event) {
                            _this.error = event.error;
                            reject(event);
                        };
                        return [2 /*return*/];
                }
            });
        }); });
    }
    WebSocketClient.prototype.handleError = function (event) {
        this.error = event.error;
        while (this.receiverQueue.length > 0) {
            var _a = __read(this.receiverQueue.shift(), 2); _a[0]; var reject = _a[1];
            reject(event.error);
        }
    };
    WebSocketClient.prototype.getClosedHandler = function (closeResolve) {
        var _this = this;
        return function (_) {
            _this.done = true;
            while (_this.receiverQueue.length > 0) {
                var _a = __read(_this.receiverQueue.shift(), 2), resolve = _a[0], reject = _a[1];
                if (_this.error) {
                    reject(_this.error);
                }
                else {
                    resolve({ value: undefined, done: true });
                }
            }
            closeResolve();
        };
    };
    WebSocketClient.prototype.getMessageHandler = function () {
        var self = this;
        return function (event) {
            var result = self.validate(event);
            if (isValidatorSuccess(result)) {
                var message = result.message;
                if (self.receiverQueue.length > 0) {
                    var _a = __read(self.receiverQueue.shift(), 2), resolve = _a[0]; _a[1];
                    resolve({ value: message, done: false });
                }
                else {
                    self.messageQueue.push(message);
                }
            }
            else {
                self.error = result.error;
                self.socket.close(1000, "Unexpected message received");
            }
        };
    };
    WebSocketClient.prototype[Symbol.asyncIterator] = function () {
        var _this = this;
        return {
            next: function () {
                if (_this.error) {
                    return Promise.reject(_this.error);
                }
                else if (_this.done) {
                    return Promise.resolve({ value: undefined, done: true });
                }
                else if (_this.messageQueue.length > 0) {
                    var message = _this.messageQueue.shift();
                    return Promise.resolve({ value: message, done: false });
                }
                else {
                    return new Promise(function (resolve, reject) {
                        _this.receiverQueue.push([resolve, reject]);
                    });
                }
            },
        };
    };
    WebSocketClient.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var serialized;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectedPromise];
                    case 1:
                        _a.sent();
                        if (this.error) {
                            throw this.error;
                        }
                        serialized = this.serialize(message);
                        return [2 /*return*/, sendMessage(this.socket, serialized)];
                }
            });
        });
    };
    WebSocketClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectedPromise];
                    case 1:
                        _a.sent();
                        if (this.done) {
                            return [2 /*return*/];
                        }
                        this.socket.close();
                        return [4 /*yield*/, this.closedPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebSocketClient;
}());

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
function isKeyCredential(credential) {
    return (typeof credential === "object" &&
        credential !== null &&
        "key" in credential &&
        typeof credential.key === "string");
}
function isTokenCredential(credential) {
    return (typeof credential === "object" &&
        credential !== null &&
        "getToken" in credential &&
        typeof credential.getToken === "function");
}
var isCredential = function (credential) {
    return isKeyCredential(credential) || isTokenCredential(credential);
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var isRTOpenAIOptions = function (options) {
    return (typeof options === "object" &&
        options !== null &&
        "model" in options &&
        typeof options.model === "string");
};
var isRTAzureOpenAIOptions = function (options) {
    return (typeof options === "object" &&
        options !== null &&
        "deployment" in options &&
        typeof options.deployment === "string");
};
var LowLevelRTClient = /** @class */ (function () {
    function LowLevelRTClient(uriOrCredential, credentialOrOptions, options) {
        var _this = this;
        var settings = (function () {
            if (isKeyCredential(uriOrCredential) &&
                isRTOpenAIOptions(credentialOrOptions)) {
                return _this.openAISettings(uriOrCredential, credentialOrOptions);
            }
            else if (isCredential(credentialOrOptions) &&
                isRTAzureOpenAIOptions(options)) {
                return _this.azureOpenAISettings(uriOrCredential, credentialOrOptions, options);
            }
            else {
                throw new Error("Invalid combination of arguments to initialize the Realtime client");
            }
        })();
        this.client = this.getWebsocket(settings);
    }
    LowLevelRTClient.prototype.azureOpenAISettings = function (uri, credential, options) {
        var _this = this;
        var scopes = ["https://cognitiveservices.azure.com/.default"];
        this.requestId = crypto.randomUUID();
        uri.searchParams.set("api-version", "2024-10-01-preview");
        uri.searchParams.set("x-ms-client-request-id", this.requestId);
        uri.searchParams.set("deployment", options.deployment);
        uri.pathname = "openai/realtime";
        return {
            uri: uri,
            policy: function (settings) { return __awaiter(_this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isKeyCredential(credential)) return [3 /*break*/, 1];
                            settings.uri.searchParams.set("api-key", credential.key);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, credential.getToken(scopes)];
                        case 2:
                            token = _a.sent();
                            settings.uri.searchParams.set("Authorization", "Bearer ".concat(token.token));
                            _a.label = 3;
                        case 3: return [2 /*return*/, settings];
                    }
                });
            }); },
        };
    };
    LowLevelRTClient.prototype.openAISettings = function (credential, options) {
        var uri = new URL("wss://api.openai.com/v1/realtime");
        uri.searchParams.set("model", options.model);
        return {
            uri: uri,
            protocols: [
                "realtime",
                "openai-insecure-api-key.".concat(credential.key),
                "openai-beta.realtime-v1",
            ],
        };
    };
    LowLevelRTClient.prototype.getWebsocket = function (settings) {
        var handler = {
            validate: function (event) {
                if (typeof event.data !== "string") {
                    return validationError(new Error("Invalid message type"));
                }
                try {
                    var data = JSON.parse(event.data);
                    if (isServerMessageType(data)) {
                        return validationSuccess(data);
                    }
                    return validationError(new Error("Invalid message type"));
                }
                catch (error) {
                    return validationError(new Error("Invalid JSON message"));
                }
            },
            serialize: function (message) { return JSON.stringify(message); },
        };
        return new WebSocketClient(settings, handler);
    };
    LowLevelRTClient.prototype.messages = function () {
        return __asyncGenerator(this, arguments, function messages_1() {
            var _a, _b, _c, message, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, 8, 13]);
                        _a = true, _b = __asyncValues(this.client);
                        _g.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                        _f = _c.value;
                        _a = false;
                        message = _f;
                        return [4 /*yield*/, __await(message)];
                    case 3: return [4 /*yield*/, _g.sent()];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    LowLevelRTClient.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LowLevelRTClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LowLevelRTClient;
}());
/*
export interface RTMessageContentChunk {
  type: MessageContentType;
  data: string;
  index: number;
}

class RTMessage implements AsyncIterable<RTMessageContentChunk> {
  private constructor(
    readonly id: string,
    readonly previousId: string | undefined,
    readonly conversationLabel: string,
    readonly content: MessageContent[],
    private readonly receive: () => Promise<ServerMessageType>,
  ) {}

  async *[Symbol.asyncIterator](): AsyncIterator<RTMessageContentChunk> {
    while (true) {
      const serverMessage = await this.receive();
      if (serverMessage === null) {
        break;
      }
      if (serverMessage.event === "message_added") {
        break;
      }
      if (
        serverMessage.event === "add_content" &&
        serverMessage.message_id === this.id
      ) {
        // const content = this.content[serverMessage.index];

        // switch (serverMessage.type) {
        //   case "text":
        //     if (content.type !== "text") {
        //       throw new Error("Unexpected content type");
        //     }
        //     content.text += serverMessage.data;
        //     break;
        //   case "audio":
        //     if (content.type !== "audio") {
        //       throw new Error("Unexpected content type");
        //     }
        //     content.audio += serverMessage.data;
        //     break;
        //   case "tool_call":
        //     if (content.type !== "tool_call") {
        //       throw new Error("Unexpected content type");
        //     }
        //     content.arguments += serverMessage.data;
        //     break;
        //   default:
        //     break;
        // }
        yield {
          type: serverMessage.type,
          data: serverMessage.data,
          index: serverMessage.index,
        };
      }
    }
  }

  static _create(
    id: string,
    previousId: string | undefined,
    conversationLabel: string,
    content: MessageContent[],
    receive: () => Promise<ServerMessageType>,
  ): RTMessage {
    return new RTMessage(id, previousId, conversationLabel, content, receive);
  }
}

export type { RTMessage };

export interface RTConversationConfiguration {
  system_message?: string;
  voice?: Voice;
  subscribe_to_user_audio?: boolean;
  output_audio_format?: AudioFormat;
  tools?: unknown;
  tool_choice?: ToolChoice;
  temperature?: number;
  max_tokens?: number;
  disable_audio?: boolean;
}

class RTConversation implements AsyncIterable<RTMessage> {
  private allMessagesQueue: MessageQueue<ServerMessageType>;
  private messageQueue: MessageQueue<ServerMessageType>;

  private constructor(
    readonly label: string,
    private readonly client: LowLevelRTClient,
    receive: () => Promise<ServerMessageType | null>,
  ) {
    this.allMessagesQueue = new MessageQueue<ServerMessageType>(
      receive,
      (message) => {
        switch (message.event) {
          case "add_message":
            return "CONVERSATION-MESSAGE";
          case "add_content":
            return "MESSAGE";
          case "message_added":
            return "MESSAGE";
          case "generation_finished":
            return "CONVERSATION-CONTROL";
          default:
            break;
        }
        return null;
      },
    );
    this.messageQueue = new MessageQueue<ServerMessageType>(
      async () => {
        return await this.allMessagesQueue.receive("MESSAGE");
      },
      (message) => {
        switch (message.event) {
          case "add_content":
            return message.message_id;
          case "message_added":
            return message.id;
          default:
            break;
        }
        return null;
      },
    );
  }

  async configure(config: RTConversationConfiguration): Promise<void> {
    await this.client.send({ event: "update_conversation_config", ...config });
  }

  async *[Symbol.asyncIterator](): AsyncIterator<RTMessage> {
    while (true) {
      const serverMessage = await this.allMessagesQueue.receive(
        "CONVERSATION-MESSAGE",
      );
      if (serverMessage === null) {
        break;
      }
      if (serverMessage.event !== "add_message") {
        throw new Error("Unexpected message type");
      }
      const message = RTMessage._create(
        serverMessage.message.id,
        serverMessage.previous_id,
        serverMessage.conversation_label,
        serverMessage.message.content,
        async () => {
          return await this.messageQueue.receive(serverMessage.message.id);
        },
      );
      yield message;
    }
  }

  async *controlMessages(): AsyncIterable<ServerGenerationFinishedMessage> {
    while (true) {
      const message = await this.allMessagesQueue.receive(
        "CONVERSATION-CONTROL",
      );
      if (message === null) {
        break;
      }
      if (message.event !== "generation_finished") {
        throw new Error("Unexpected message type");
      }
      yield message;
    }
  }

  static _create(
    label: string,
    client: LowLevelRTClient,
    receive: () => Promise<ServerMessageType | null>,
  ) {
    return new RTConversation(label, client, receive);
  }
}

export type { RTConversation };

export interface RTSessionConfiguration {
  turn_detection?: TurnDetection;
  input_audio_format?: AudioFormat;
  transcribe_input?: boolean;
  vad?: VADConfiguration;
}

export class RTClient {
  private client: LowLevelRTClient;
  private messageQueue: MessageQueue<ServerMessageType>;
  private conversationQueue: MessageQueue<ServerMessageType>;
  private conversationMap: Map<string, string> = new Map();

  constructor(key: string);
  constructor(uri: URL, key: string);
  constructor(uriOrKey: string | URL, key?: string) {
    this.client =
      key === undefined
        ? new LowLevelRTClient(uriOrKey as string)
        : new LowLevelRTClient(uriOrKey as URL, key);
    this.messageQueue = new MessageQueue<ServerMessageType>(
      async () => {
        for await (const message of this.client.messages()) {
          return message;
        }
        return null;
      },
      (message) => {
        switch (message.event) {
          case "start_session":
          case "error":
          case "vad_speech_started":
          case "vad_speech_stopped":
          case "input_transcribed":
          case "generation_canceled":
          case "send_state":
            return "SESSION";
          case "add_message":
          case "add_content":
          case "message_added":
          case "generation_finished":
            return "CONVERSATION";
          default:
            break;
        }
        return null;
      },
    );
    this.conversationQueue = new MessageQueue<ServerMessageType>(
      async () => {
        return await this.messageQueue.receive("CONVERSATION");
      },
      (message) => {
        switch (message.event) {
          case "add_message":
            this.conversationMap.set(
              message.message.id,
              message.conversation_label,
            );
            return message.conversation_label;
          case "add_content":
            return this.conversationMap.get(message.message_id) ?? null;
          case "message_added":
            this.conversationMap.delete(message.id);
            return message.conversation_label;
          case "generation_finished":
            return message.conversation_label;
          default:
            break;
        }
        return null;
      },
    );
  }

  async configure(config: RTSessionConfiguration): Promise<void> {
    await this.client.send({ event: "update_session_config", ...config });
  }

  getDefaultConversation(): RTConversation {
    return RTConversation._create("default", this.client, async () => {
      return this.conversationQueue.receive("default");
    });
  }

  async createConversation(label: string): Promise<RTConversation> {
    if (label === "default") {
      throw new Error("Cannot create conversation with label 'default'");
    }
    await this.client.send({ event: "create_conversation", label });
    return RTConversation._create(label, this.client, async () => {
      return this.conversationQueue.receive(label);
    });
  }

  async deleteConversation(label: string): Promise<void> {
    if (label === "default") {
      throw new Error("Cannot delete conversation with label 'default'");
    }
    await this.client.send({ event: "delete_conversation", label });
  }

  async sendAudio(audio: ArrayBuffer): Promise<void> {
    const base64Encoded = Buffer.from(audio).toString("base64");
    await this.client.send({ event: "add_user_audio", data: base64Encoded });
  }

  async *controlMessages(): AsyncIterable<ServerMessageType> {
    while (true) {
      const message = await this.messageQueue.receive("SESSION");
      if (message === null) {
        break;
      }
      yield message;
    }
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
*/

export { LowLevelRTClient, MessageItemType };
//# sourceMappingURL=index.js.map
