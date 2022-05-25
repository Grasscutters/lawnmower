import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
async function run(interaction: CommandInteraction) {
    const range = interaction.options.getNumber('range', true);
    const messages = await interaction.channel!.messages.fetch({ limit: range });
    messages.forEach(async (message) => {
        await message.delete();
    });
    interaction.reply({
        content: `Deleted ${range} messages`,
        ephemeral: true,
    });
}

const cmd = new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge messages')
    .addNumberOption(o => o.setName('range').setDescription('The number of messages to delete').setRequired(true))

let _;
export default _ = {
    process: run,
    command: cmd
}