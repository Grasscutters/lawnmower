import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import blacklist from "../db/blacklist.json";
import fs from "fs";

async function run(interaction: CommandInteraction) {
  switch (interaction.options.getSubcommand(true)) {
    case "list":
      interaction.reply({
        content: JSON.stringify(blacklist, null, 4),
        ephemeral: true,
      });
      break;
    case "add":
      const keyword = interaction.options.getString("word", true);
      if (blacklist.includes(keyword)) {
        interaction.reply({
          content: `${keyword} is already blacklisted.`,
          ephemeral: true,
        });
        return;
      }

      blacklist.push(keyword);
      fs.writeFileSync(
        "./src/db/blacklist.json",
        JSON.stringify(blacklist, null, 4)
      );

      interaction.reply({
        content: "** **",
        embeds: [
          {
            title: `Blacklist`,
            description: `${keyword} has been blacklisted.`,
            color: 0xff0000,
            footer: {
              text: interaction.user?.tag,
            },
          },
        ],
      });
      break;
    case "remove":
      const keywordToRemove = interaction.options.getString("word", true);
      if (!blacklist.includes(keywordToRemove)) {
        interaction.reply({
          content: `${keywordToRemove} is not blacklisted.`,
          ephemeral: true,
        });
        return;
      }

      blacklist.splice(blacklist.indexOf(keywordToRemove), 1);
      fs.writeFileSync(
        "./src/db/blacklist.json",
        JSON.stringify(blacklist, null, 4)
      );

      interaction.reply({
        content: "** **",
        embeds: [
          {
            title: `Blacklist`,
            description: `${keywordToRemove} has been removed from the blacklist.`,
            color: 0xff0000,
            footer: {
              text: interaction.user?.tag,
            },
          },
        ],
      });
      break;
    default:
      interaction.reply({
        content: "Unknown subcommand",
        ephemeral: true,
      });
  }
}

const cmd = new SlashCommandBuilder()
  .setName("blacklist")
  .setDescription("Manages the blacklist")
  .setDefaultPermission(false)
  .addSubcommand((o) =>
    o
      .setName("add")
      .setDescription("Adds a word to the blacklist")
      .addStringOption((word) =>
        word.setName("word").setRequired(true).setDescription("The word to add")
      )
  )
  .addSubcommand((o) =>
    o
      .setName("remove")
      .setDescription("Removes a word from the blacklist")
      .addStringOption((word) =>
        word
          .setName("word")
          .setRequired(true)
          .setDescription("The word to remove")
      )
  )
  .addSubcommand((o) =>
    o.setName("list").setDescription("Lists all words in the blacklist")
  );

let _;
export default _ = {
  process: run,
  command: cmd,
};
