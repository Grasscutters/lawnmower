import { REST } from '@discordjs/rest';
import { Client, Guild, Intents } from 'discord.js';
import getConfig from './util/config';
import register from './util/registercommands';
import getEvents, { findEvent } from './events/eventHandler';
import { Routes } from 'discord-api-types/v10';
import Logger from './util/Logger';
const c = new Logger('Grasscutter');
const ci = new Logger('Command', 'blue');
const ce = new Logger('Event', 'yellow');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.on('ready', () => {
    c.log(`Ready to serve in ${client.guilds.cache.size} guilds as ${client.user?.tag}.`);
});

async function registerEvent(event: string, ...args: any) {
    const events = await getEvents();
    const eventFunc = findEvent(events, event);
    ce.log(`${event} was called`)
    if (eventFunc) await eventFunc(...args);
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    import(`./commands/${interaction.commandName}`).then(async (cmd) => {
        ci.log(`/${interaction.commandName} was called by ${interaction.user.username}#${interaction.user.discriminator}`);
        await cmd.default.process(interaction);
    }).catch(async (error) => {
        console.error(error)
        import('./commands/default').then(async (cmd) => {
            await cmd.default.process(interaction);
        });
    });
});

client.on('messageCreate', async (message) => {
    await registerEvent('messageCreate', message);
});

client.on('messageReactionAdd', async (reaction, user) => {
    await registerEvent('messageReactionAdd', reaction, user, client);
});

client.on('guildMemberAdd', async (member) => {
    await registerEvent('guildMemberAdd', member);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    await registerEvent('messageUpdate', oldMessage, newMessage);
});

client.on('messageDelete', async (message) => {
    await registerEvent('messageDelete', message);
});

// This isn't going to be used but still nice to have
client.on('messageDeleteBulk', async (messages) => {
    await registerEvent('messageDeleteBulk', messages);
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