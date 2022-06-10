import { Client, Guild, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import Logger from "../util/Logger";
const c = new Logger("messageReactionAdd");

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
    if (!user.bot) {
        const member = guild?.members.cache.find(member => member.id === user.id);
        if (!member || !reaction.count) return;

        if (reaction.emoji.name == '🔨' && reaction.count < 2) {
            reaction.message.reply(`Please read <#978197435056787597>.`);
            setInterval(() => {
                reaction.message.delete();
            }, 5000);
        }
    }
}