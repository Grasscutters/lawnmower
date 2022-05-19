import { SlashCommandBuilder } from '@discordjs/builders';
import findBestMatch from '../util/stringSimilarity';
import _GM from '../GM.json';
import Logger from '../util/Logger';
import { CommandInteraction } from 'discord.js';
const c = new Logger('/gm');

interface GM {
    array: string[];
    object: { [key: string]: string };
}

async function run(interaction: CommandInteraction) {
    const GM = _GM as GM;
    await interaction.deferReply({
        ephemeral: true
    });
    const query = interaction.options.getString('query') || "";
    const matches = findBestMatch(query, GM.array);
    // matches.bestMatch.target
    interaction.editReply(`${matches.bestMatch.target}: ${GM.object[matches.bestMatch.target]}`);
    c.trail(`${matches.bestMatch.target}: ${GM.object[matches.bestMatch.target]}`);
}

const cmd = new SlashCommandBuilder()
    .setName('gm')
    .setDescription('Search for items or monsters in the GM Handbook')
    .addStringOption(o => o.setName('query').setRequired(true).setDescription('The query to search for'));

let _;
export default _ = {
    process: run,
    command: cmd
}