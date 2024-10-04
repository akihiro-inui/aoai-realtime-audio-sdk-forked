import { ItemCreateMessage, SessionUpdateMessage, ToolsDefinition } from "rt-client";

export class AssistantService {

    language: string = "English";

    private toolsForGenericAssistants = [
        {
            name: 'music_controller',
            description: 'Controls the music player in the car. You can play, pause, stop, skip to the next track, or go back to the previous track.',
            parameters: {
                type: 'object',
                properties: {
                    action: { type: 'string', description: 'The action for the music player control. It can be play, pause, stop, next, or previous.' }
                },
                required: ['action']
            },
            returns: async (arg: string) => {
                let action = JSON.parse(arg).action;
                return `The music player has been set to ${action}.`;
            }
        },
        {
            name: 'open_car_windows',
            description: 'Opens specified car windows to allow fresh air into the vehicle or improve ventilation. You can choose to open individual windows or all windows at once.',
            parameters: {
                type: 'object',
                properties: {
                    window_positions: {
                        type: 'array',
                        description: 'A list of window positions to open. Possible values include front_left, front_right, rear_left, rear_right, or all.',
                        items: {
                            type: 'string',
                            enum: ['front_left', 'front_right', 'rear_left', 'rear_right', 'all']
                        }
                    }
                },
                required: ['window_positions']
            },
            returns: async (arg: string) => {
                let windows = JSON.parse(arg).window_positions.join(", ");
                return `The following windows have been opened: ${windows}.`;
            }
        },
        {
            name: 'set_navigation_destination',
            description: 'Sets the destination in the car\'s navigation system. This function updates the GPS to guide you to the specified address or point of interest.',
            parameters: {
                type: 'object',
                properties: {
                    destination: {
                        type: 'string',
                        description: 'The address or name of the destination to set in the navigation system.'
                    }
                },
                required: ['destination']
            },
            returns: async (arg: string) => {
                let destination = JSON.parse(arg).destination;
                return `Navigation set to: ${destination}.`;
            }
        },
        {
            name: 'get_car_length',
            description: 'Retrieves the total length of the car. This information is useful for parking, garage storage, or transport considerations.',
            parameters: {
                type: 'object',
                properties: {
                    car_name: {
                        type: 'string',
                        description: 'The name of the car model to get the length of.'
                    }
                },
                required: ['car_name']
            },
            returns: async (arg: string) => {
                let carName = JSON.parse(arg).car_name;
                return `The length of ${carName} is 4.5 meters.`;
            }
        },
        {
            name: 'get_seating_capacity',
            description: 'Retrieves the maximum number of occupants the car can accommodate, including the driver and passengers.',
            parameters: {
                type: 'object',
                properties: {
                    car_name: {
                        type: 'string',
                        description: 'The name of the car model to get the seating capacity of.'
                    }
                },
                required: ['car_name']
            },
            returns: async (arg: string) => {
                let carName = JSON.parse(arg).car_name;
                return `${carName} can accommodate up to 5 occupants.`;
            }
        },
        {
            name: 'get_fuel_type',
            description: 'Retrieves the type of fuel the car uses, such as gasoline, diesel, electric, or hybrid. This information is important for refueling and energy considerations.',
            parameters: {
                type: 'object',
                properties: {
                    car_name: {
                        type: 'string',
                        description: 'The name of the car model to get the fuel type of.'
                    }
                },
                required: ['car_name']
            },
            returns: async (arg: string) => {
                let carName = JSON.parse(arg).car_name;
                return `${carName} uses gasoline as its fuel type.`;
            }
        }
    ];

    public async getToolResponse(toolName: string, parameters: string, call_id: string): Promise<ItemCreateMessage | SessionUpdateMessage> {
        let tools = [...this.toolsForGenericAssistants];
        let content = await tools.find(tool => tool.name === toolName)!.returns(parameters);
        let response: ItemCreateMessage = {
            type: 'conversation.item.create',
            item: {
                type: 'function_call_output',
                call_id: call_id,
                output: content
            }
        };
        return response;
    }
}
