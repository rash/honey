import { Client } from "hiven";
import { Honey } from "./honey/Honey"
import { readFileSync } from "fs";

const client = new Client({ type: "user" })
const honey = new Honey(client)
honey.init(getHivenToken())

function getHivenToken(): string {
    const config = JSON.parse(readFileSync("config.json", "utf-8"))
    return config.hivenToken
}