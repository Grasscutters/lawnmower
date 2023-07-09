/**
 * @file sendToLog.ts
 * @description Send an embed to #message-logs
 */

import {
  Client,
  Attachment,
  TextChannel,
  User,
  Colors,
} from "discord.js";
import Logger from "./Logger";
const c = new Logger("sendToLog");
type ValueOf<T> = T[keyof T];

export default async function sendToLog(
  title: string,
  description: string,
  color: ValueOf<typeof Colors>,
  user: User | null,
  client: Client,
  attachments?: Attachment[]
) {
  c.log(`Sending embed to #message-logs`);
  c.trail(title);
  c.trail(description);
  const channel = client.channels.cache.get(
    "975624009674805270"
  ) as TextChannel;
  if (!channel) return;
  const embed = {
    title: title,
    description: description,
    color: color,
    footer: {
      text: user?.tag || "Unknown",
      iconURL: `https://cdn.discordapp.com/avatars/${user?.id || 0}/${user?.avatar || 0
        }.png`,
    },
    timestamp: new Date().toISOString(),
  };
  await channel.send({
    embeds: [embed],
    content: "** **",
    files: attachments,
  });
}
