import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

async function run(interaction: CommandInteraction) {
  const who = interaction.options.getUser("who");
  interaction.reply({
    content: `${interaction.user.toString()} has segs with ${who?.username ?? "nobody (0 bitches)"}.`,
  });
}

const cmd = new SlashCommandBuilder()
  .setName("segs")
  .setDescription("Have segs")
  .addUserOption((o) =>
    o
      .setName("who")
      .setDescription("Who to seg")
      .setRequired(true)
  );

let _;
export default _ = {
  process: run,
  command: cmd,
};
