export default async function run(interaction: any) {
    interaction.reply({
        content: `Command not found`,
        ephemeral: true,
    });
}