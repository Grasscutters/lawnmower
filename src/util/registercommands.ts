import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import getConfig from './config';
import fs from 'fs';
interface Command {
    name: string;
    description: string;
}


const rest = new REST({ version: '9' }).setToken('token');

(async () => {
    const commands = JSON.parse(await fs.readFileSync('./src/commands.json', 'utf8')) as Command[];
    try {
        const config = await getConfig();
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.client_id, config.target_guild),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();