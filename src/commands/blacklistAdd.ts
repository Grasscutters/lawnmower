import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import Logger from '../util/Logger';
const fs = require("fs");
const c = new Logger('/blacklistAdd');

async function run(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    if(member.permissions.has("MANAGE_MESSAGES")) {
        const word = interaction.options.getString('word') || "";
        let bl = fs.readFileSync('../blacklist.json');
        let json = JSON.parse(bl);
        json.push(word);
        let data = JSON.stringify(json)
        fs.writeFileSync('../blacklist.json', data)
        interaction.reply({
            content: `Added to blacklisted words`,
            ephemeral: true,
        });
        c.log(`Added a string to blacklist.json`);
    } else return;
}

const cmd = new SlashCommandBuilder()
    .setName('blacklistAdd')
    .setDescription('Add a String to the blacklisted.json file to blacklist the word')
    .addStringOption(o => o.setName('word').setRequired(true).setDescription('The word to blacklist'));

let _;
export default _ = {
    process: run,
    command: cmd
}