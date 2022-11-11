import { ModalSubmitInteraction, RoleManager, GuildMemberRoleManager } from "discord.js";
import crypto from 'crypto';
import config from '../config.json';
import Logger from '../util/Logger';
const c = new Logger('modalSubmit');

export default async function verify(interaction: ModalSubmitInteraction) {
    const password = config.support_password_hash; // You're hopeless if you checked here for the password.
    const hash = crypto.createHash('md5');
    const verifiedRole = (interaction.guild?.roles as RoleManager).cache.get('978201137972912198');
    const input = interaction.fields.getTextInputValue('password-input');
    const hashedInput = hash.update(input).digest('hex');

    if (hashedInput === password) {
        c.trail(`Verified successfully`);
        if (verifiedRole) {
            (interaction.member?.roles as GuildMemberRoleManager).add(verifiedRole);
            interaction.reply({
                content: `You've been verified!`,
                ephemeral: true,
            });
        }
    } else {
        c.trail(`Incorrect password: ${input} | ${hashedInput} != ${password}`);
        interaction.reply({
            content: `Incorrect password.`,
            ephemeral: true,
        });
        return;
    }
}