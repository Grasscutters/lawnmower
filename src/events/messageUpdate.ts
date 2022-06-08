import { Message, PartialMessage } from "discord.js";
import Logger from "../util/Logger";
import sendToLog from "../util/sendToLog";
import blacklist from '../db/blacklist.json';
const c = new Logger("messageUpdate", "cyan");

export default async function run(oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage) {
    if (newMessage.author?.bot) return;

    blacklist.forEach(b => {
        if (newMessage.content?.toLowerCase().includes(b.toLowerCase())) {
            newMessage.delete();
            return;
        }
    });

    c.log(`Message edited by ${newMessage.author?.tag || ""} (${newMessage.id})`);
    if (newMessage.cleanContent) c.trail(newMessage.cleanContent);
    sendToLog(`Message edited in ${newMessage.channel.toString()}`, `New message: ${newMessage.content}\nID: ${newMessage.id}`, 'BLUE', newMessage.author, oldMessage.client);
}
