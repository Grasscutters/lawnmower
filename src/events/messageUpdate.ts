import { Message, PartialMessage } from "discord.js";
import Logger from "../util/Logger";
import sendToLog from "../util/sendToLog";
const c = new Logger("messageUpdate", "cyan");

export default async function run(oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage) {
    if (newMessage.author!.bot) return;

    c.log(`Message edited by ${newMessage.author!.tag} (${newMessage.id})`);
    sendToLog(`Message edited in <#${newMessage.channel.id}>`, `${newMessage.author!.tag} edited their message ${newMessage.id} to: ${newMessage.content}`, 'BLUE', newMessage.author, oldMessage.client);
}