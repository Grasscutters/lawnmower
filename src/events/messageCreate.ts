import source from '../db/source.json';

const regexList: RegExp[] = [];
source.forEach(s => {
    s.keywords.forEach(element => {
        regexList.push(new RegExp(element, 'gi'));
    });
});

function find(action: string) {
    return source.find(s => s.keywords.includes(action));
}

export default async function run(message: any) {
    if (message.author.bot) return;
    if (message.channel.id != '965284036333424722') return;
    regexList.some(regex => {
        if (regex.test(message.content)) {
            message.react('👀');
            find(message.content) ? message.channel.send(find(message.content)?.action) : '';
        }
    });
}