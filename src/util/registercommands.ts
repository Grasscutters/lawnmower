import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
interface Command {
    name: string;
    description: string;
}

export default async function register(config: any) {
const rest = new REST({ version: '9' }).setToken(config.token);


    const commands = JSON.parse(await fs.readFileSync('./src/db/commands.json', 'utf8')) as Command[];
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.client_id, config.target_guild),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}