import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

async function run(interaction: CommandInteraction) {
  const who = interaction.options.getUser("who");
  interaction.reply({
    content: who ? `${interaction.user.toString()} has segs with <@${who.id}>.` : `${interaction.user.toString()} has no bitches :skull:`,
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
