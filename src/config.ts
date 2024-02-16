import * as dotenv from "dotenv";

dotenv.config();

type ConfigType = {
  token: string | undefined;
  guildId: string | undefined;
  clientId: string | undefined;
};

export const config: ConfigType = {
  clientId: process.env.CLIENT_ID,
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
};
