import { SlashCommandBuilder } from '@discordjs/builders';

async function run(interaction: any) {
    interaction.reply({
        content: `Command not found`,
        ephemeral: true,
    });
}

const cmd = new SlashCommandBuilder()
    .setName('cmd')
    .setDescription('desc')

let _;
export default _ = {
    process: run,
    command: null
}