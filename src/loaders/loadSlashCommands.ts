import { Client, REST, Routes } from "discord.js";
import { config } from "src/config";
import CommandType from "../../types/discord";

export async function loadSlashCommand(client: Client) {
  const commands: CommandType[] = [];
  const rest = new REST().setToken(config.token!);
  const commandJSON = commands.flatMap((oldCMD) => oldCMD.command.toJSON());

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    await rest.put(
      Routes.applicationGuildCommands(config.clientId!, config.guildId!),
      {
        body: commandJSON,
      }
    );
    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
