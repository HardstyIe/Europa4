export const config = {
    clientId: process.env.CLIENT_ID,
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.GUILD_ID,
};
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config();
// @ts-ignore
client.commands = new Collection();
//Chemin  des commandes puis boucle sur les fichiers pour determiner les differentes commandes
const commandsPath = path.resolve(process.cwd(), "src", "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
commandFiles.push(...fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts")));
for (const file of commandFiles) {
    const filePath = path.resolve(commandsPath, file);
    const command = import(filePath);
    if ("data" in command && "execute" in command) {
        // @ts-ignore
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    // @ts-ignore
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
        else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
});
//Chemin des events et boucle sur les differents fichier
const eventsPath = path.resolve(process.cwd(), "src", "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts"));
for (const file of eventFiles) {
    const filePath = path.resolve(eventsPath, file);
    const event = import(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.login(config.token);
//TODO: CHANGER LE TYPAGE ANY
//# sourceMappingURL=main.js.map