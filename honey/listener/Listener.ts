import { Honey } from "../Honey";

export abstract class Listener {

    constructor(protected honey: Honey) {}

    abstract startListening(): void
}