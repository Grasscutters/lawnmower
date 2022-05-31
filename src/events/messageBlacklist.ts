import { Message } from "discord.js";
import Logger from "../util/Logger";
import sendToLog from "../util/sendToLog";
const c = new Logger("messageCreate", "red");
const bl = require('./blacklist.json')

export default async function run(message: Message) {
    var content = message.content.toLowerCase();
    for (var i = 0; i <=bl.length; i++) {
        if (content.includes(bl[i])) {
            message.delete();
            c.log(`Message in ${message.channel.toString()} deleted`);
            sendToLog(`Message deleted in ${message.channel.toString()}`, message.cleanContent, 'RED', message.author, message.client);
        }
    }
}