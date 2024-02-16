import { REST, Routes } from "discord.js";
import { config } from "src/main";
export async function loadSlashCommand(client) {
    const commands = [];
    const rest = new REST().setToken(config.token);
    const commandJSON = commands.flatMap((oldCMD) => oldCMD.command.toJSON());
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
            body: commandJSON,
        });
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=loadSlashCommands.js.map