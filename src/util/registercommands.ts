import { ApplicationCommandDataResolvable, Client } from "discord.js";
import fs from 'fs';

export default async function register() {
    const allCommands: ApplicationCommandDataResolvable[] = [];
    fs.readdirSync('./src/commands').forEach(file => {
        import(`../commands/${file}`).then(module => {
            const target = module.default.command;
            if (!target) return;
            allCommands.push({
                name: target.name,
                description: target.description,
            });
            console.log(`Registered command /${target.name}`);
        });
    });
    return allCommands;
}