import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js';

const modal = new ModalBuilder()
    .setCustomId('verification-modal')
    .setTitle('Verify')

const passwordInput = new TextInputBuilder()
    .setCustomId('password-input')
    .setLabel('Password')
    .setPlaceholder('Enter your password')
    .setStyle(TextInputStyle.Short)

const row = new ActionRowBuilder<TextInputBuilder>().addComponents(passwordInput);

modal.addComponents(row);

export default modal;