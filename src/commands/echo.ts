import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
async function run(interaction: CommandInteraction) {
    interaction.channel?.send(interaction.options.getString('message')!);
}

const cmd = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Sends back the message you send.')
    .addStringOption(o => o.setName('message').setDescription('The message to send back').setRequired(true))
    .setDefaultPermission(false);

let _;
export default _ = {
    process: run,
    command: cmd
}