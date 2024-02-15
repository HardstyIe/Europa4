const dotenv = require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
  clientId: process.env.CLIENT_ID,
};
