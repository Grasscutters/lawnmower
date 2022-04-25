import { GuildMember } from "discord.js";
import Logger from "../util/Logger";
const c = new Logger("guildMemberAdd");

export default async function run(member: GuildMember) {
    member.roles.add(`967814912250380338`);
    c.trail(`${member.user.username}#${member.user.discriminator} joined the server.`);
}