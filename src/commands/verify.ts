import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMemberRoleManager, RoleManager } from 'discord.js';
import crypto from 'crypto';
import Logger from '../util/Logger';
import config from '../config.json';
const c = new Logger('/verify');

async function run(interaction: CommandInteraction) {
    const password = config.support_password_hash; // You're hopeless if you checked here for the password.
    const hash = crypto.createHash('md5');
    const input = interaction.options.getString('password', true);
    const verifiedRole = (interaction.guild?.roles as RoleManager).cache.get('978201137972912198');
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

    if (hash.update(input).digest('hex') === password) {
        c.trail(`Verified successfully`);
        if (verifiedRole) {
            (interaction.member?.roles as GuildMemberRoleManager).add(verifiedRole);
            interaction.reply({
                content: `You've been verified!`,
                ephemeral: true,
            });
        }
    } else {
        c.trail(`Incorrect password: ${input}`);
        interaction.reply({
            content: `Incorrect password.`,
            ephemeral: true,
        });
        return;
    }
}

const cmd = new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Access the support channels')
    .addStringOption(o => o.setName('password').setDescription(`Password from the wiki`).setRequired(true))

let _;
export default _ = {
    process: run,
    command: cmd
}