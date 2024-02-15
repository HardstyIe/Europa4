import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import * as path from "path";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// @ts-ignore
client.commands = new Collection();
const foldersPath = path.resolve(process.cwd(), "src", "commands");
const commandFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".ts"));
for (const file of commandFiles) {
  const filePath = path.resolve(foldersPath, file);
  const command: any = import(filePath);
  if ("data" in command && "execute" in command) {
    // @ts-ignore
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  // @ts-ignore
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

const eventsPath = path.resolve(process.cwd(), "src", "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.resolve(eventsPath, file);
  const event: any = import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(`${process.env.DISCORD_TOKEN}`);
//TODO: CHANGER LE TYPAGE ANY
