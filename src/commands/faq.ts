import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';

async function run(interaction: CommandInteraction) {
    const embed = new MessageEmbed();
    const input = {
        question: interaction.options.getString('question') || "",
        answer: interaction.options.getString('answer') || "",
    }
    embed.setTitle(input.question)
        .setDescription(input.answer)
        .setColor('#9f2b2b')
        .setFooter({
            text: `${interaction.member?.user.username || "???"} • ${new Date().toLocaleString()}`,
            iconURL: `https://cdn.discordapp.com/avatars/${interaction.member?.user.id || "0"}/${interaction.member?.user.avatar || "0"}.png`
        });

    interaction.reply({
        ephemeral: true,
        embeds: [embed],
        content: '** **',
    });

    (interaction.client.channels.cache.get('974428071811756052') as TextChannel).send({
        embeds: [embed],
        content: '** **'
    });
}

const cmd = new SlashCommandBuilder()
    .setName('faq')
    .setDescription('Post to #faq channel')
    .addStringOption(o => o.setName('question').setRequired(true).setDescription('question'))
    .addStringOption(o => o.setName('answer').setRequired(true).setDescription('answer'))

let _;
export default _ = {
    process: run,
    command: cmd
}