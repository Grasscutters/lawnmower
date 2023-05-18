import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
async function run(interaction: CommandInteraction) {
  let count = interaction.options.getInteger('count') ?? 1;
  let payload: string = new Array(count).fill(`<@593787701409611776>`);
  interaction.channel?.send(payload);
}

const cmd = new SlashCommandBuilder()
    .setName('scald')
    .addIntegerOption(o => o.setName('count').setDescription('The number of pings').setMinValue(1))
    .setDescription('Pings Scald.');

let _;
export default _ = {
    process: run,
    command: cmd
}
