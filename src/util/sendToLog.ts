/**
 * @file sendToLog.ts
 * @description Send an embed to #message-logs
*/

import { Client, ColorResolvable, TextChannel, User } from "discord.js";
import Logger from "./Logger";
const c = new Logger("sendToLog");

export default async function sendToLog(title: string, description: string, color: ColorResolvable, user: User | null, client: Client) {
    const channel = client.channels.cache.get("975624009674805270") as TextChannel;
    if (!channel) return;
    const embed = {
        title: title,
        description: description,
        color: color,
        footer: {
            text: user!.tag,
            iconURL: `https://cdn.discordapp.com/avatars/${user!.id}/${user!.avatar}.png`
        },
        timestamp: Date.now()
    };
    await channel.send({
        embeds: [embed],
        content: "** **"
    });
}