import { SlashCommandBuilder } from '@discordjs/builders';
import {CommandInteraction, GuildMember} from 'discord.js';

async function run(interaction: CommandInteraction) {
    let member: GuildMember = <GuildMember> interaction.member;
    await member.ban({
        days: 1, reason: "haha funny delete server"
    });

    await interaction.reply({
        content: `** **`,
        ephemeral: false,
        embeds: [
            {
                type: "rich",
                title: `Grasscutters`,
                description: `goodbye`,
                color: 0x03fc41
            }
        ]
    });
}

const cmd = new SlashCommandBuilder()
    .setName('deleteserver')
    .setDescription('Deletes the server')

let _;
export default _ = {
    process: run,
    command: cmd
}