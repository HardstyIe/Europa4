const discord = require("discord.js");
const config = require("./config");
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");

const intents = new discord.IntentsBitField(3276799);
const bot = new discord.Client({ intents });

bot.commands = new discord.Collection();

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);
