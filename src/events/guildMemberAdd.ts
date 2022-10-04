import { GuildMember } from "discord.js";
import Logger from "../util/Logger";
const c = new Logger("guildMemberAdd");

export default async function run(member: GuildMember) {
    c.trail(`${member.user.username}#${member.user.discriminator} joined the server.`);
    member.user.send(`Hi ${member.user}, welcome to Grasscutters!\nJust a friendly reminder that this is NOT the place to ask for help regarding Grasscutter or other anime game software. Please visit <#978197435056787597> to see how to verify yourself so you can ask in <#1019987283593674883>. Of course, if you're not here to ask for help, go on ahead.\n\n**If you do need help, your problem is likely to already have been solved here. Use the handy search function (top right in your Discord window, or ctrl+f), and search your problem there.**\n\n**The password is hidden in the Wiki, which there is a link for in <#978197435056787597>. Do not ask for the password.** ***The point of verifying is to prove you've already read the proper documentation to fix your issue.***`);
}
