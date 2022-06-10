import { Client, Guild, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
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

        if (reaction.emoji.name == '❌') { // Team members can remove messages by reacting
            if (member.roles.highest.id == `968896919424339998`) {
                reaction.message.delete();
                c.trail(`Deleted message by ${user.username}#${user.discriminator} with ${reaction.count} votes`);
            }
        }
    }
}
