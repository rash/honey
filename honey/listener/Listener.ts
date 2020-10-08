import { Honey } from "../Honey";

export abstract class Listener {
    protected honey: Honey

    constructor(honey: Honey) {
        this.honey = honey;
    }

    public abstract startListening(): void
}