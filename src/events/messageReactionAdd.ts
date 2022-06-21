import { Client, Guild, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import Logger from "../util/Logger";
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

    if (!user.bot && !reaction.message.author?.bot) {
        if (!reaction.count) return;

        if (reaction.emoji.name == '🔨' && reaction.count < 2 && WHITELISTED_CHANNELS.includes(Number(reaction.message.channelId)) && !reaction.message.member?.roles.cache.some(r => r.id == '978201137972912198')) {
            const msg = await reaction.message.reply({
                content: `Please read <#978197435056787597>.`,
                allowedMentions: {
                    repliedUser: false
                },
            });
            reaction.message.react('🔨');
            setTimeout(() => {
                msg.delete();
            }, 30000);
        }
    }
}
