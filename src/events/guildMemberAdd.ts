import { GuildMember } from "discord.js";
import Logger from "../util/Logger";
import getConfig from '../util/config';
const c = new Logger("guildMemberAdd");

export default async function run(member: GuildMember) {
    c.trail(`${member.user.username}#${member.user.discriminator} joined the server.`);
	
	const config = await getConfig();
	member.user.send(`Hi ${member.user}, welcome to Grasscutters!\n` + config.welcome_message);
}
