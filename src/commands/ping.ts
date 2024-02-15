import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Affiche la latence du bot");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  await interaction.reply({
    content: `Ping : \`${interaction.client.ws.ping}\` ms`,
  });
}
