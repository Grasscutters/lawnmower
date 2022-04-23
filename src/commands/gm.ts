import { SlashCommandBuilder } from '@discordjs/builders';
import findBestMatch from '../util/stringSimilarity';
import _GM from '../GM.json';
const GM = _GM as GM;

interface GM {
    array: string[];
    object: { [key: string]: string };
}

async function run(interaction: any) {
    await interaction.deferReply({
        ephemeral: true
    });
    const query = interaction.options.getString('query');
    const matches = findBestMatch(query, GM.array);
    // matches.bestMatch.target
    interaction.editReply(`${matches.bestMatch.target}: ${GM.object[matches.bestMatch.target]}`);
}

const cmd = new SlashCommandBuilder()
    .setName('gm')
    .setDescription('Search for items or monsters in the GM Handbook')

cmd.addStringOption((option): any => {
    option.setName('query');
    option.setRequired(true);
    option.setDescription('The query to search for');

    _GM.array.forEach(element => {
        option.addChoice(element, element);
    });
});
let _;
export default _ = {
    process: run,
    command: cmd
}