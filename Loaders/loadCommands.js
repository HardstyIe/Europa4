const fs = require("fs");
const { type } = require("os");

module.exports = async (bot) => {
  fs.readdirSync("./commands")
    .filter((file) => file.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../commands/${file}`);

      if (!command.data.name || typeof command.data.name !== "string")
        throw new TypeError(
          `La commande ${file.slice(0, file.length - 3)} n'est pas bonne`
        );
      bot.commands.set(command.data.name, command.data);
    });
};
