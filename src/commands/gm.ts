import { SlashCommandBuilder } from '@discordjs/builders';
import findBestMatch from '../util/stringSimilarity';
import GM from '../GM.json';
import Logger from '../util/Logger';
import { CommandInteraction } from 'discord.js';
const c = new Logger('/gm');

async function run(interaction: CommandInteraction) {
    await interaction.deferReply({
        ephemeral: true
    });

    const query = interaction.options.getString('query') || "";
    const matches = findBestMatch(query, Object.keys(GM));
    // matches.bestMatch.target

    // interaction.editReply(`${matches.bestMatch.target}: ${GM.object[matches.bestMatch.target as keyof typeof GM.object]}`);
    // c.trail(`${matches.bestMatch.target}: ${GM.object[matches.bestMatch.target as keyof typeof GM.object]}`);

    const gm = GM[matches.bestMatch.target as keyof typeof GM];
    interaction.editReply(`${matches.bestMatch.target}: ${gm}`);
    c.trail(`${matches.bestMatch.target}: ${gm}`);
}

const cmd = new SlashCommandBuilder()
    .setName('gm')
    .setDescription('Search for items or monsters in the GM Handbook')
    .addStringOption(o => o.setName('query').setRequired(true).setDescription('The query to search for'));

export default {
    process: run,
    command: cmd
}