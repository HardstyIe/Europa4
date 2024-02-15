const discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Checks bot's latency.",
  async run(bot, message) {
    await message.reply(`Ping : \`${bot.ws.ping}\` `);
  },
};
