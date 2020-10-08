import { Message } from "hiven/Collections/Message";
import { Room } from "hiven/Collections/Room";
import { Honey } from "../../Honey";
import { Command } from "../Command";

export class CleanCommand extends Command {

    constructor() {
        super("Clean", "Searches up to 50 messages and removes ones belonging to you", true, 1)
    }

    public execute(message: Message, honey: Honey, parameters: string[]) {
        message.destroy().then(() => {
            var searchLimit = 50
            if (parameters.length == 1) {
                searchLimit = Number(parameters[0])
                if (isNaN(searchLimit)) {
                    message.room.send(`**Error:** ${parameters[0]} is not a number.`)
                    return
                } else if (searchLimit > 50 || searchLimit <= 0) {
                    message.room.send(`**Error:** ${searchLimit} is out of bounds.`)
                    return
                }
            }
            honey.client.rest.get(`/rooms/${message.room.id}/messages?before=${message.id}`).then(async response => {
                var deletionCount = 0
                for (let messageNumber = 0; messageNumber < searchLimit; messageNumber++) {
                    const messageData = response.data[messageNumber]
                    if (messageData.author != undefined && messageData.author.username == honey.client.user.username) {
                        await honey.client.rest.delete(`/rooms/${message.room.id}/messages/${messageData.id}`).then(() => {
                            deletionCount++
                        })
                    }
                }
                this.sendResult(message.room, deletionCount)
            })
        })
    }

    private sendResult(currentRoom: Room, deletionCount: number) {
        var properMessage = "No messages were deleted."
        if (deletionCount > 1) {
            properMessage = `**${deletionCount}** messages were deleted.`
        } else if (deletionCount == 1) {
            properMessage = "**1** message was deleted."
        }
        currentRoom.send(properMessage)
    }
}