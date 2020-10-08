import { Message } from "hiven/Collections/Message"
import { Honey } from "../Honey"

export abstract class Command {
    public readonly name: string
    public readonly description: string
    public readonly hasOptionalParameters: boolean
    public readonly expectedParameterCount: number

    constructor(name: string, description: string, hasOptionalParameters: boolean, expectedParameterCount: number) {
        this.name = name
        this.description = description
        this.hasOptionalParameters = hasOptionalParameters
        this.expectedParameterCount = expectedParameterCount
    }

    public abstract execute(message: Message, honey: Honey, paramters?: string[])
}