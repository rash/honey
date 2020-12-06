import { Message } from "hiven/Collections/Message"
import { Honey } from "../Honey"

export abstract class Command {

    constructor(readonly name: string, readonly description: string, readonly hasOptionalParameters: boolean, readonly expectedParameterCount: number) {}

    abstract execute(message: Message, honey: Honey, paramters?: string[]): void
}