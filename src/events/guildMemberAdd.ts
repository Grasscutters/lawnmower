import { GuildMember } from "discord.js";
import Logger from "../util/Logger";
const c = new Logger("guildMemberAdd");

export default async function run(member: GuildMember) {
    c.trail(`${member.user.username}#${member.user.discriminator} joined the server.`);
}