import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("salut")
  .setDescription("Affiche la latence du client");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    content: `Salut  ${interaction.user.username} !`,
  });
}
