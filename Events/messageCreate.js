const discord = require("discord.js");

module.exports = async (bot, message) => {
  let prefix = "!";

  let messageArray = message.content.split(" ");
  let commandName = messageArray[0].slice(prefix.length);
  let args = messageArray.slice(1);

  let command = require(`../Commands/${commandName}`);

  if (!message.content.startsWith(prefix)) return;

  if (!command) return message.reply("Aucune commande disponible!");

  command.run(bot, message, args);
};
