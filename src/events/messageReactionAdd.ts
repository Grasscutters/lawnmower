import { Client, Guild, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";

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
        if (reaction.emoji.name == '❌') {
            const member = guild?.members.cache.find(member => member.id === user.id);
            // @ts-ignore
            if (member._roles.includes(`965284035985305682`) && reaction.count >= 2) {
                reaction.message.delete();
            }
        }
    }
}