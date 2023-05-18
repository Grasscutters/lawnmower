import { ButtonInteraction, GuildMemberRoleManager } from "discord.js";
import verificationModal from "../util/verificationModal";
import Logger from "../util/Logger";
const c = new Logger("verification");

export default async function run(interaction: ButtonInteraction) {
  const hasVerified = (
    interaction.member!.roles as GuildMemberRoleManager
  ).cache.some((r) => r.name === "Verified");

  c.log(
    `User ${interaction.member?.user.username || "???"}#${
      interaction.member?.user.discriminator || "0000"
    } is verifying`
  );
  if (hasVerified) {
    c.trail(`Already verified`);
    interaction.reply({
      content: `You're already verified!`,
      ephemeral: true,
    });
    return;
  }

  interaction.showModal(verificationModal);
}
