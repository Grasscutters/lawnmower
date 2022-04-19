import { Client, Intents } from 'discord.js';
import getConfig from './util/config';
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
    console.log(`Ready to serve in ${client.guilds.cache.size} guilds.`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    import(`./commands/${interaction.commandName}`).then(async (cmd) => {
        await cmd.default(interaction);
    }).catch((error) => {
        import('./commands/default').then(async (cmd) => {
            await cmd.default(interaction);
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
    client.login(config.token);
})();