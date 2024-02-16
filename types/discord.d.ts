import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

type Command = {
  command: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};

export default Command;
