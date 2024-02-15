const Discord = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Affiche la latence du bot"),
  async execute(interaction) {
    await interaction.reply({
      content: `Salut  ${interaction.user.username} !`,
    });
  },
};
