import { Message } from "discord.js";
import Logger from "../util/Logger";
import sendToLog from "../util/sendToLog";
const c = new Logger("messageDelete", "red");

export default async function run(message: Message) {
    c.log(`Message deleted by ${message.author!.tag}: ${message.cleanContent}`);
    sendToLog(`Message deleted in <#${message.channel.id}>`, `${message.author!.tag} deleted their message: ${message.cleanContent}`, 'RED', message.author, message.client);
}