import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

const FORCE_NO_BITCHES_USER_IDS = ["593787701409611776"];

async function run(interaction: CommandInteraction) {
  const who = interaction.options.getUser("who");
  const noBitches =
    !who ||
    who.id === interaction.user.id ||
    FORCE_NO_BITCHES_USER_IDS.includes(interaction.user.id);

  interaction.reply({
    content: noBitches
      ? `${interaction.user.toString()} has no bitches :skull:`
      : `${interaction.user.toString()} has segs with <@${who.id}>.`,
  });
}

const cmd = new SlashCommandBuilder()
  .setName("segs")
  .setDescription("Have segs")
  .addUserOption((o) =>
    o
      .setName("who")
      .setDescription("Who to seg")
      .setRequired(false)
  );

let _;
export default _ = {
  process: run,
  command: cmd,
};
