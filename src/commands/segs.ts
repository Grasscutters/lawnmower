import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

async function run(interaction: CommandInteraction) {
  const who = interaction.options.getString("who");
  interaction.reply({
    content: `${interaction.user.toString()} has segs with ${who}.`,
  });
}

const cmd = new SlashCommandBuilder()
  .setName("segs")
  .setDescription("Have segs")
  .addStringOption((o) =>
    o
      .setName("who")
      .setDescription("Who/what/whatever to seg")
      .setRequired(true)
  );

let _;
export default _ = {
  process: run,
  command: cmd,
};
