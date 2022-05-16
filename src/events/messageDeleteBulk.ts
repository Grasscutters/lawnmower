import { Collection, Message, PartialMessage } from "discord.js";
import Logger from "../util/Logger";
import sendToLog from "../util/sendToLog";
const c = new Logger("messageDeleteBulk", "red");

export default async function run(messages: Collection<string, Message<boolean> | PartialMessage>) {
    c.log(`${messages.size} messages deleted in ${messages.first()!.channel.toString()}`);
    for (const message of messages.values()) {
        sendToLog(`Message deleted in <#${message.channel.id}>`, `${message.author!.tag} deleted their message: ${message.cleanContent}`, 'RED', message.author, message.client);
    }
}