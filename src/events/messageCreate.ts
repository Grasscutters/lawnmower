import source from '../db/source.json';
import blacklist from '../db/blacklist.json';
import Logger from '../util/Logger';
import { Message } from "discord.js";
import sendToLog from '../util/sendToLog';
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
const actionList: {
    action?: string;
    action_cn?: string;
    keywords: string[];
}[] = [];
source.forEach(s => {
    regexList.push(buildSearch(s.keywords));
    actionList.push({ action: s.action, keywords: s.keywords, action_cn: s.action_cn });
});

const $support = '978314904220106832';
const $support_cn = '967477370997076079';
const supportChannels: string[] = [
    $support,
    $support_cn
];

function filterInvis(content: string) {
    if (content.search(/[^\u0000-\u007E]/g) >= -1)
        return content.replace(/[^\u0000-\u007E]/g, "");
    else
        return content;
}

export default async function run(message: Message) {
    if (message.author.bot) return;

    blacklist.forEach(b => {
        if (filterInvis(message.content.toLowerCase().split(' ').join('')).includes(b.toLowerCase())) {
            message.delete();
            return;
        }
    });
    c.trail(`<${message.author.username}#${message.author.discriminator}> ${message.content}`);

    if (!supportChannels.includes(message.channel.id)) return;

    regexList.forEach(async regex => {
        if (regex.test(message.content)) {
            const action = actionList.find(a => a.keywords.some(k => regex.test(k)));
            message.react('👀');
            if (action) {
                switch (message.channel.id) {
                    case $support_cn:
                        if (action.action_cn) message.reply(action.action_cn);
                        break;
                    default:
                        if (action.action) message.reply(action.action);
                        break;
                }
                c.trail(`Match found for ${action.keywords[0]}`)
            }
        }
    });
}
