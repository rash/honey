import { Message } from "hiven/Collections/Message";
import { Command } from "../../command/Command";
import { Listener } from "../Listener";

const PREFIX = "honey!"

export class MessageListener extends Listener {

    startListening() {
        this.honey.client.on("message", (message: Message) => {
            if (message.author.username == this.honey.client.user.username && message.content.startsWith(PREFIX)) {
                const command = this.findCommand(message)
                if (command != undefined) {
                    const parameters = message.content.split(" ")
                    parameters.shift()
                    const parameterCount = parameters.length
                    const expectedParameterCount = command.expectedParameterCount
                    if (parameterCount != expectedParameterCount) {
                        message.destroy().then(() => message.room.send("**Error:** Parameter count does not match expected parameter count."))
                    } else {
                        command.execute(message, this.honey, parameters)
                    }
                }
            }
        })
    }

    private findCommand(message: Message) {
        const providedCommand = message.content.split(" ")[0].replace(PREFIX, "")
        for (const command of this.honey.commands) {
            if (command.name.toUpperCase() == providedCommand.toUpperCase()) {
                return command
            }
        }
    }
}