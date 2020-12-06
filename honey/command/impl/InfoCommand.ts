import { MessageCollection } from "hiven";
import { Honey } from "../../Honey";
import { Command } from "../Command";
import { SnowflakeToDate } from "hiven/Utils/Snowflake"

const USER_DOESNT_EXIST_RESPONSE = "That user does not exist"

export class InfoCommand extends Command {

    constructor() {
        super("Info", "Provides information about a provided user.", false, 1)
    }

    execute(message: MessageCollection, honey: Honey, parameters: string[]) {
        message.destroy().then(() => {
            const username = parameters[0]
            honey.client.rest.get(`/users/${username}`).then(response => {
                const nameMessage = `**Name**: ${response.data.name} \n`
                const dateMessage = `**Account creation date**: ${SnowflakeToDate(response.data.id).toLocaleDateString("en-US")} \n`
                const location = response.data.location
                const website = response.data.website
                const bio = response.data.bio
                var responseMessage = "**__Results__** \n";
                responseMessage += nameMessage + dateMessage
                if (location != null) {
                    responseMessage += `**Location: ** ${location} \n`
                }
                if (website != null) {
                    responseMessage += `**Website: ** ${website} \n`
                }
                if (bio != null) {
                    responseMessage += `**Bio: ** ${bio} \n`
                }
                message.room.send(responseMessage.slice(0, responseMessage.lastIndexOf("\n")))
            }).catch(error => {
                if (error.error.message == USER_DOESNT_EXIST_RESPONSE) {
                    message.room.send("**Error:** The provided user does not exist.")
                } else {
                    message.room.send("**Error:** An unknown error occurred.")
                }
            })
        })
    }

}