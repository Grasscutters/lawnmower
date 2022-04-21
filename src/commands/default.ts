import { SlashCommandBuilder } from '@discordjs/builders';
async function run(interaction: any) {
    interaction.reply({
        content: `Command not found`,
        ephemeral: true,
    });
}

let _;
export default _ = {
    process: run,
    command: null
}