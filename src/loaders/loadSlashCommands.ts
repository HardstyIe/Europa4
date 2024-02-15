import { Client, REST, Routes, SlashCommandBuilder } from "discord.js";
import { clientId, guildId, token } from "src/config";

export async function loadSlashCommand(client: Client) {
  const commands: SlashCommandBuilder[] = [];
  const rest = new REST().setToken(token!);

  client.commands.forEach((cmd) => commands.push(cmd.command));

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    await rest.put(Routes.applicationGuildCommands(clientId!, guildId!), {
      body: commands,
    });
    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
