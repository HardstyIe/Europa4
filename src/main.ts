import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Routes,
} from "discord.js";
import * as fs from "fs";
import * as path from "path";
import CommandType from "../types/discord";
import { config } from "./config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// @ts-ignore
client.commands = new Collection();

//Chemin  des commandes puis boucle sur les fichiers pour determiner les differentes commandes
const commands: CommandType[] = [];
const commandsPath = path.resolve(process.cwd(), "src", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
commandFiles.push(
  ...fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"))
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command);
}

client.once(Events.ClientReady, async (event) => {
  console.log(`Ready! Logged in as ${event.user.tag}`);

  let rest = client.rest;

  console.log(`Started refreshing ${commands.length} application commands.`);
  const commandJSON = commands.flatMap((oldCMD) => oldCMD.command.toJSON());
  let data: number = <number>await rest.put(
    Routes.applicationCommands(event.application.id),
    {
      body: commandJSON,
    }
  );
  console.log(
    `Successfully reloaded ${data.valueOf.length} application commands.`
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // @ts-ignore
  const command = commands.find(
    (cmd) => cmd.command.name === interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName}`);
    return;
  }
  command.execute(interaction).catch((e) => {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(e);
  });
});

client.login(config.token);
