import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { MessagePayload } from 'discord.js';
import artifact from '../db/artifact.json';
import Logger from '../util/Logger';
import stringSimilarity from '../util/stringSimilarity';
const c = new Logger("/artifact", "yellow");


function printStats(): string {
    return getSubstatKeys().join('\n');
}

async function run(interaction: any) {
    c.debug(interaction.options);
    await interaction.deferReply({
        ephemeral: true
    });

    switch (interaction.options._subcommand) {
        case 'help':
            const payload = new MessagePayload(interaction, {
                content: `
Syntax: \`/artifact generate <Artifact ID> <level> <mainstat> [UID] [substats]\`
If you don't add a substats, they will be randomly generated.
                
Available substats:`,
                files: [{
                    attachment: Buffer.from(printStats(), 'utf8'),
                    name: 'artifact.txt'
                }]
            });
            interaction.editReply(payload);
            break;
        case 'generate':
            const id = interaction.options.getString('id');
            const level = interaction.options.getNumber('level');
            const mainStat = interaction.options.getString('mainstat');
            const uid = interaction.options.getString('uid');
            let subStats;
            try {
                subStats = interaction.options.getString('substats').split(',');
            } catch {
                subStats = getRandomSubstats(3);
            }

            interaction.editReply(`/gart${uid ? ` ${uid}` : ''} ${id} ${translate(mainStat)} ${parseSubstats(subStats)} ${level}`);
            c.trail(`/gart${uid ? ` ${uid}` : ''} ${id} ${translate(mainStat)} ${parseSubstats(subStats)} ${level}`);
            break;
        default:
            console.log(`Unknown subcommand ${interaction.options.getSubCommand()}`);
            break;
    }
}

function arrayToChoices(array: string[]): [name: string, value: string][] {
    return array.map(str => [str, str]);
}

function getSubstatKeys(): string[] {
    const result = [];
    for (const entry in artifact.subStats) {
        result.push(
            // @ts-ignore
            `${Object.keys(artifact.subStats[entry])[0]}: ${artifact.subStats[entry][Object.keys(artifact.subStats[entry])[0]]}`
        );
    }
    return result;
}

function OGSubstatKeys(): string[] {
    const result = [];
    for (const entry in artifact.subStats) {
        result.push(
            `${Object.keys(artifact.subStats[entry])[0]}`
        );
    }
    return result;
}

function parseSubstats(substats: string[]): string {
    const parsed: number[] = [];
    substats.forEach(stat => {
        const match = stringSimilarity(stat, OGSubstatKeys()).bestMatch.target;
        // @ts-ignore
        parsed.push(artifact.subStats.find(entry => Object.keys(entry)[0] === match)[match]);
    });
    return parsed.join(' ');
}

function translate(string: string): number {
    try {
        // @ts-ignore
        return artifact.statTranslation[string] as number;
    } catch {
        return 14001;
    }
}

function getRandomSubstats(times: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < times; i++) {
        const rand = Math.floor(Math.random() * OGSubstatKeys().length);
        result.push(OGSubstatKeys()[rand]);
    }
    return result;
}

const cmd = new SlashCommandBuilder()
    .setName('artifact')
    .setDescription('Generates an artifact command.')
    .addSubcommand(o => o.setName('help').setDescription('Gives you a list of possible stats.'))
    .addSubcommand(subcommand => subcommand.setName('generate').setDescription('Generates an artifact command.')
        .addStringOption(id => id.setName('id').setRequired(true).setDescription('The artifact ID'))
        .addNumberOption(level => level.setName('level').setRequired(true).setDescription('The level of the artifact'))
        .addStringOption(mainStat => mainStat.setName('mainstat').setRequired(true).setDescription('The main stat').addChoices(arrayToChoices(artifact.mainStatList)))
        .addStringOption(uid => uid.setName('uid').setRequired(false).setDescription('The players UID'))
        .addStringOption(subStats => subStats.setName('substats').setRequired(false).setDescription('Sub stats separated by a comma. Place a ! after an ID to level it up'))
    )
let _;
export default _ = {
    process: run,
    command: cmd
}