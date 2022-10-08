import { Client, Guild, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import Logger from "../util/Logger";
import config from '../config.json';
import starboard from "../util/starboard";
const c = new Logger("messageReactionAdd");

// #general, #general-zh, #general-other, #development, #development-zh, #plugin-dev
const WHITELISTED_CHANNELS = [965284035985305689, 973699269557112882, 966835424603537448, 965619953900326973, 970935992032825364, 970830900227100742]

export default async function run(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, client: Client) {
    const guild: Guild | undefined = client.guilds.cache.get(`965284035985305680`);
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }

    c.trail(`${user.tag || "???"} reacted with ${reaction.emoji}`)

    if (!user.bot && !reaction.message.author?.bot) {
        if (!reaction.count) return;

        if (reaction.emoji.name == '🔨' && reaction.count < 2 && WHITELISTED_CHANNELS.includes(Number(reaction.message.channelId)) && !reaction.message.member?.roles.cache.some(r => r.id == '978201137972912198')) {
            const msg = await reaction.message.reply({
                content: `Please read <#1028327705571238009>.`,
                allowedMentions: {
                    repliedUser: false
                },
            });
            c.log(`User ${user.tag || "???"} reacted with hammer`);
            reaction.message.react('🔨');
            setTimeout(() => {
                msg.delete();
            }, 30000);
        }
        if (reaction.emoji.name == "⭐" && reaction.message.channelId !== "988887511843606598") {
            let reactionCount = reaction.count;
            if(reaction.message.reactions.cache.get('⭐')!.users.cache.has(reaction.message.author!.id)) reactionCount--;
            if (reactionCount !== config.starboard_threshold) return;
            starboard(reaction.message as Message);
        }
    }
}
