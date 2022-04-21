import { SlashCommandBuilder } from '@discordjs/builders';
async function run(interaction: any) {
    interaction.reply({
        content: `** **`,
        ephemeral: true,
        embeds: [
            {
                type: "rich",
                title: `Grasscutters`,
                description: `An unofficial community for the Grasscutter server.\n\n**Permanent Invite Link**: https://discord.gg/T5vZU6UyeG\n**GitHub Repository**: https://github.com/Melledy/Grasscutter\n**Trello Board**: https://trello.com/b/ij3ICC8K/features`,
                color: 0x03fc41
            }
        ]
    });
}

const cmd = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help command')

let _;
export default _ = {
    process: run,
    command: cmd
}