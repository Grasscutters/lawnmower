import { MessageActionRow, Modal, TextInputComponent } from 'discord.js';

const modal = new Modal()
    .setCustomId('verification-modal')
    .setTitle('Verify')

const passwordInput = new TextInputComponent()
    .setCustomId('password-input')
    .setLabel('Password')
    .setPlaceholder('Enter your password')
    .setStyle('SHORT')

const row = new MessageActionRow<TextInputComponent>().addComponents(passwordInput)
modal.addComponents(row)

export default modal;