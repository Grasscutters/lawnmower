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
        const member = guild?.members.cache.find(member => member.id === user.id);
        if (!member || !reaction.count) return;

        if (reaction.emoji.name == '❌') { // Contributors can delete messages by reacting with a red cross
            if (member.roles.highest.id == `965284035985305682` && reaction.count >= 2) {
                reaction.message.delete();
            }
        }

        if (reaction.emoji.name == 'pato' && reaction.message.id == `967820613362282526`) { // Pato
            member.roles.add(`967814912250380338`);
        }
    }
}