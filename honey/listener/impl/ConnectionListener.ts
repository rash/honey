import { Listener } from "../Listener";

export class ConnectionListener extends Listener {

    private isInititalConnection: boolean = true

    startListening() {
        this.honey.client.on('init', () => {
            const properWord = this.isInititalConnection ? "Connected" : "Reconnected"
            if (this.isInititalConnection) {
                this.isInititalConnection = false
            }
            console.log(`${properWord} to Hiven Swarm, messages will now be recieved.`)
        })
    }
}