import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

async function run(interaction: CommandInteraction) {
    interaction.reply('https://crepe.moe/jaCki9CJ');
}

const cmd = new SlashCommandBuilder()
    .setName('sloot')
    .setDescription('Sloot behaviour')

let _;
export default _ = {
    process: run,
    command: cmd
}
