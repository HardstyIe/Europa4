const fs = require("fs");
const { type } = require("os");

module.exports = async (bot) => {
  fs.readdirSync("./Commands")
    .filter((file) => file.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../Commands/${file}`);

      if (!command.name || typeof command.name !== "string")
        throw new TypeError(
          `La commande ${file.slice(0, file.length - 3)} n'est pas bonne`
        );
      bot.commands.set(command.name, command);
    });
};
