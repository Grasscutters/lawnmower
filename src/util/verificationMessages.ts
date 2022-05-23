import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import vm from '../db/verificationMessages.json';
import Logger from './Logger';
const c = new Logger(`verificationMessages`);

export default async function run(interaction: CommandInteraction) {
    vm.forEach(v => {
        const embed = new MessageEmbed();
        embed.setTitle(`:flag_${v.lang_code}: **${v.title}**`)
            .setDescription(v.content)
            .setColor('#7289da')
            .setFooter({
                text: new Date().toLocaleString()
            });
        (interaction.client.channels.cache.get('978197435056787597') as TextChannel).send({
            embeds: [embed],
            content: '** **'
        });
    });
}