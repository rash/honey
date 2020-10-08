import { Message } from "hiven/Collections/Message"
import { Honey } from "../../Honey";
import { Command } from "../Command";

export class HelpCommand extends Command {

    constructor() {
        super("Help", "Shows a list of available commands along with a description of what each one does", false, 0)
    }
    
    public execute(message: Message, honey: Honey) {
        var commandRespose = "**__Name - Description__** \n"
        for (const command of honey.commands) {
            commandRespose += `${command.name} - ${command.description}`
            if (honey.commands.indexOf(command) != honey.commands.length - 1) {
                commandRespose += "\n"
            }
        }
        message.destroy().then(() => message.room.send(commandRespose))
    }
}