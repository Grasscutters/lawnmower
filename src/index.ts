import { Client, Intents } from 'discord.js';
import getConfig from './util/config';
import register from './util/registercommands';
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
    console.log(`Ready to serve in ${client.guilds.cache.size} guilds as ${client.user?.tag}.`);
});

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

client.on('messageCreate', async (message) => {
    import('./events/messageCreate').then(async (event) => {
        await event.default(message);
    });
});

(async () => {
    const config = await getConfig();
    await register().then(async (commands) => {
        client.application?.commands.set(commands, config.target_guild);
    });
    client.login(config.token);
})();