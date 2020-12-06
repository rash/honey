import { Client } from "hiven";
import { Command } from "./command/Command";
import { CleanCommand } from "./command/impl/CleanCommand";
import { HelpCommand } from "./command/impl/HelpCommand";
import { InfoCommand } from "./command/impl/InfoCommand";
import { HoneyError } from "./error/HoneyError";
import { ConnectionListener } from "./listener/impl/ConnectionListener";
import { MessageListener } from "./listener/impl/MessageListener";
import { Listener } from "./listener/Listener";


export class Honey {
    private hasBeenInitializedAlready: boolean
    private readonly listeners: Listener[] = [new ConnectionListener(this), new MessageListener(this)]
    readonly commands: Command[] = [new HelpCommand(), new CleanCommand(), new InfoCommand]

    constructor(readonly client: Client) {}

    init(token: string) {
        if (this.hasBeenInitializedAlready) {
            throw new HoneyError("Current instance is already initialized")
        }
        console.log("Starting up Honey.")
        this.client.connect(token)
        for (const listener of this.listeners) {
            listener.startListening()
        }
        this.hasBeenInitializedAlready = true
    }
}