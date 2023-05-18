import {
  CommandInteraction,
  EmbedBuilder,
  TextChannel,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import vm from "../db/verificationMessages.json";
import Logger from "./Logger";
const c = new Logger(`verificationMessages`);

const verificationRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setCustomId("verification-button")
    .setLabel("Verify")
    .setStyle(ButtonStyle.Success)
);

export default async function run(
  interaction: CommandInteraction,
  specify?: string
) {
  vm.forEach((v, idx, arr) => {
    if (specify && v.lang_code != specify) return;

    const embed = new EmbedBuilder();
    embed
      .setTitle(`:flag_${v.lang_code}: **${v.title}**`)
      .setDescription(v.content)
      .setColor("#7289da")
      .setFooter({
        text: new Date().toLocaleString(),
      });

    (
      interaction.client.channels.cache.get(
        "1028327705571238009"
      ) as TextChannel
    ).send({
      embeds: [embed],
      content: "** **",
      components: idx == arr.length - 1 ? [verificationRow] : [],
    });
  });
}
