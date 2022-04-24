import { REST } from '@discordjs/rest';
import { Client, Guild, Intents } from 'discord.js';
import getConfig from './util/config';
import register from './util/registercommands';
import getEvents, { findEvent } from './events/eventHandler';
import { Routes } from 'discord-api-types/v10';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.on('ready', () => {
    console.log(`Ready to serve in ${client.guilds.cache.size} guilds as ${client.user?.tag}.`);
});

async function registerEvent(event: string, ...args: any) {
    const events = await getEvents();
    const eventFunc = findEvent(events, event);
    if (eventFunc) await eventFunc(...args);
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    import(`./commands/${interaction.commandName}`).then(async (cmd) => {
        await cmd.default.process(interaction);
    }).catch(async (error) => {
        import('./commands/default').then(async (cmd) => {
            await cmd.default.process(interaction);
        });
    });
});

import source from './db/source.json';

function buildSearch(substrings: string[]) {
    return new RegExp(
        substrings
            .map(function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); })
            .join('{1,}|') + '{1,}'
        , 'gi');
}

const regexList: RegExp[] = [];
const actionList: { action: string; keywords: string[]; }[] = [];
source.forEach(s => {
    regexList.push(buildSearch(s.keywords));
    actionList.push({ action: s.action, keywords: s.keywords });
});

client.on('messageCreate', async (message) => {
    // await registerEvent('messageCreate', message);
    if (message.author.bot) return;
    if (message.channel.id != '965284036333424722') return;
    regexList.some(regex => {
        if (regex.test(message.content)) {
            const action = actionList.find(a => a.keywords.some(k => regex.test(k)));
            message.react('👀');
            action ? message.channel.send(action.action) : '';
        }
    });
});

client.on('messageReactionAdd', async (reaction, user) => {
    // await registerEvent('messageReactionAdd', reaction, user);
    const guild: Guild | undefined = client.guilds.cache.get(`965284035985305680`);
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }
    if (!user.bot) {
        const member = guild?.members.cache.find(member => member.id === user.id);
        if (!member || !reaction.count) return;

        if (reaction.emoji.name == '❌') { // Contributors can delete messages by reacting with a red cross
            if (member.roles.highest.id == `965284035985305682` && reaction.count >= 2) {
                reaction.message.delete();
            }
        }

        if (reaction.emoji.name == 'pato' && reaction.message.id == `967820613362282526`) { // Pato
            member.roles.remove(`967814912250380338`);
        }
    }
});

client.on('guildMemberAdd', async (member) => {
    const role = member.guild.roles.cache.find(role => role.id == "967814912250380338");
    if (!role) return;
    member.roles.add(role);
});

(async () => {
    const config = await getConfig();
    const rest = new REST({ version: '9' }).setToken(config.token);
    await register().then(async (commands) => {
        await rest.put(Routes.applicationGuildCommands(config.client_id, config.target_guild), {
            body: commands
        });
    });
    client.login(config.token);
})();