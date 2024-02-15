const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  Discord,
  Collection,
} = require("discord.js");
const config = require("./config");
const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.login(config.token);
loadCommands(client);
loadEvents(client);
