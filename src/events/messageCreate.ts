import source from '../db/source.json';
import Logger from '../util/Logger';
import { Message } from "discord.js";
import detect from '../util/ocr';
const c = new Logger('messageCreate');

function buildSearch(substrings: string[]) {
    return new RegExp(
        substrings
            .map(function (s) {
                return s.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&');
            })
            .join('{1,}|') + '{1,}'
        , 'gi');
}

const regexList: RegExp[] = [];
const actionList: { action: string; keywords: string[]; }[] = [];
source.forEach(s => {
    regexList.push(buildSearch(s.keywords));
    actionList.push({ action: s.action, keywords: s.keywords });
});

export default async function run(message: Message) {
    if (message.author.bot) return;
    c.trail(`<${message.author.username}#${message.author.discriminator}> ${message.content}`);
    if (message.channel.id != '965284036333424722') return;

    regexList.forEach(async regex => {
        const ocr = await detect(message);
        if (regex.test(message.content) || regex.test(ocr)) {
            const action = actionList.find(a => a.keywords.some(k => regex.test(k)));
            message.react('👀');
            if (action) {
                message.reply(action.action);
                c.trail(`Match found for ${action.keywords[0]}`)
            }
        }
    });
}