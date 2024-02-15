const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./events")
    .filter((file) => file.endsWith(".js"))
    .forEach(async (file) => {
      let event = require(`../events/${file}`);
      bot.on(file.split(".js").join(""), event.bind(null, bot));
    });
};
