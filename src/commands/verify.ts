import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMemberRoleManager, RoleManager } from 'discord.js';
import Logger from '../util/Logger';
import verificationModal from '../util/verificationModal';
const c = new Logger('/verify');

async function run(interaction: CommandInteraction) {
    const hasVerified = (interaction.member!.roles as GuildMemberRoleManager).cache.some(r => r.name === "Verified");

    c.log(`User ${interaction.member?.user.username || "???"}#${interaction.member?.user.discriminator || "0000"} is verifying`);
    if (hasVerified) {
        c.trail(`Already verified`);
        interaction.reply({
            content: `You're already verified!`,
            ephemeral: true,
        });
        return;
    }

    interaction.showModal(verificationModal);
}

const cmd = new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Access the support channels')

let _;
export default _ = {
    process: run,
    command: cmd
}