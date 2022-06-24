import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import fs from 'fs'
const sloot = require('../db/sloot.json');

async function run(interaction: CommandInteraction) {
    let list = Object.keys(sloot).join(", ")
    switch (interaction.options.getSubcommand(true)) {
        case 'list':
            interaction.reply({
                embeds: [{
                    title: `Sloot List`,
                    description: `${list}`,
                    color: 'RANDOM',
                    footer: {
                        text: interaction.user?.tag,
                    }
                }],
                ephemeral: true
            })
            break;
        case 'fetch':
            let name = interaction.options.getString('name', true)
            if (!sloot[name])
                return interaction.reply({ content: 'No key found', ephemeral: true })
            else
                interaction.reply({ content: sloot[name] })
            break;
        case 'add':
            let key = interaction.options.getString('key', true)
            let value = interaction.options.getString('value', true)
            let json = JSON.parse(sloot)
            json[key] = value
            let data = JSON.stringify(json, null, 2)
            fs.writeFileSync('../db/sloot.json', data)
            interaction.reply({content: 'Added', ephemeral: true})
            break;
        default:
            interaction.reply({
                content: 'Unknown subcommand',
                ephemeral: true
            })
    }
}

const cmd = new SlashCommandBuilder()
    .setName('sloot')
    .setDescription('Sloot behaviour')
    .addSubcommand(o => o.setName('fetch')
        .setDescription('Fetches an image from the db')
        .addStringOption(o => o.setName('name').setDescription('key for the link to fetch from db').setRequired(true))
    )
    .addSubcommand(o => o.setName('add')
        .setDescription('Adds an image from the db')
        .addStringOption(o => o.setName('key').setDescription('name of the value to be set in the db').setRequired(true))
        .addStringOption(o => o.setName('value').setDescription('value to be set').setRequired(true))
    )
    .addSubcommand(o => o.setName('list')
        .setDescription('Lists all the keys in the db')
    )

let _;
export default _ = {
    process: run,
    command: cmd
}
