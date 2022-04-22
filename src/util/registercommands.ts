import { ApplicationCommandDataResolvable, Client } from "discord.js";
import fs from 'fs';

export default async function register() {
    const allCommands: ApplicationCommandDataResolvable[] = [];
    await fs.readdirSync('./src/commands').forEach(async file => {
        await import(`../commands/${file}`).then(async module => {
            const target = module.default.command;
            if (!target) return;
            await allCommands.push(target.toJSON());
            console.log(`Registered command /${target.name}`);
        });
    });
    return allCommands;
}