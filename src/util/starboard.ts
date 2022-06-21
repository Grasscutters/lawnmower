/**
 * @file starboard.ts
 * @description Send a starboard message to #starboard
*/

import { Message, MessageEmbed, TextChannel } from "discord.js";
import Logger from "./Logger";
const c = new Logger("Starboard");

export default async function starboard(message: Message) {
    c.log(`Sending star to #starboard`);
    c.trail(`${message.content} (${message.id})`);
    c.trail(`By ${message.author.tag || "???"}`);

    const channel = message.client.channels.cache.get("988887511843606598") as TextChannel;
    if (!channel) return;

    const embed = new MessageEmbed();
    embed.setTitle(`🌟 Message starred in #${await (message.channel as TextChannel).name}`)
        .setDescription(message.content)
        .setColor("YELLOW")
        .setFooter({
            text: message.author?.tag || "Unknown",
            iconURL: `https://cdn.discordapp.com/avatars/${message.author?.id || 0}/${message.author?.avatar || 0}.png`
        })
        .setTimestamp(Date.now())
        .setURL(message.url);

    if (message.attachments.first()?.url) embed.setImage(message.attachments.first()!.url!)
    await channel.send({
        embeds: [embed],
        content: "** **"
    });
}