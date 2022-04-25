import source from '../db/source.json';
import Logger from '../util/Logger';
import {Message} from "discord.js";
import Tesseract from "tesseract.js";
const c = new Logger('messageCreate');

function buildSearch(substrings: string[]) {
    return new RegExp(
        substrings
            .map(function (s) {
                return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            })
            .join('{1,}|') + '{1,}'
        , 'gi');
}

const regexList: RegExp[] = [];
const actionList: { action: string; keywords: string[]; }[] = [];
source.forEach(s => {
    regexList.push(buildSearch(s.keywords));
    actionList.push({action: s.action, keywords: s.keywords});
});

export default async function run(message: Message) {
    if (message.author.bot) return;
    c.trail(`<${message.author.username}#${message.author.discriminator}> ${message.content}`);
    if (message.channel.id != '965284036333424722') return;
    let imageOcr = "";
    if (message.attachments.size > 0) {
        let url = message.attachments.first()?.url;
        if (url != null && (url.endsWith('.png') || url.endsWith('.jpg'))) {
            const recognizeResult = await Tesseract.recognize(url);
            imageOcr = recognizeResult.data.text;
        }
    }
    if (message.content.endsWith('.png') || message.content.endsWith('.jpg')) {
        const recognizeResult = await Tesseract.recognize(message.content);
        imageOcr = recognizeResult.data.text;
    }
    regexList.some(regex => {
        if (regex.test(message.content) || regex.test(imageOcr)) {
            const action = actionList.find(a => a.keywords.some(k => regex.test(k)));
            message.react('👀');
            if (action) {
                message.channel.send(action.action);
                c.trail(`Match found for ${action.keywords[0]}`)
            }
        }
    });
}