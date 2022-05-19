/**
 * @file sendToLog.ts
 * @description Send an embed to #message-logs
*/

import { Client, ColorResolvable, MessageAttachment, TextChannel, User } from "discord.js";
import Logger from "./Logger";
const c = new Logger("sendToLog");

export default async function sendToLog(title: string, description: string, color: ColorResolvable, user: User | null, client: Client, attachments?: MessageAttachment[]) {
    const channel = client.channels.cache.get("975624009674805270") as TextChannel;
    if (!channel) return;
    const embed = {
        title: title,
        description: description,
        color: color,
        footer: {
            text: user?.tag || "Unknown",
            iconURL: `https://cdn.discordapp.com/avatars/${user!.id || 0}/${user!.avatar || 0}.png`
        },
        timestamp: Date.now()
    };
    await channel.send({
        embeds: [embed],
        content: "** **",
        attachments: attachments || undefined
    });
}