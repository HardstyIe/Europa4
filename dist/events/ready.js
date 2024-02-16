import { Events } from "discord.js";
export const name = Events.ClientReady;
export const once = true;
export const execute = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
};
//# sourceMappingURL=ready.js.map