const fs = require("fs");
const Discord = require("discord.js");
const express = require("express");
const cors = require("cors");
const Route = require("./routes");
const client = require("./Client");
const { isValidRole } = require("./utils/discord");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.BOT_PREFIX;

client.commands = new Discord.Collection();

app.use(cors());
app.use(express.json());

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  Route(app);
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    const userCommand = client.commands.get(command);
    const defaultRolesQuery = { $or: [] };

    const roleQuery = userCommand.roles || defaultRolesQuery;

    if (!isValidRole(roleQuery, message.member.roles.cache)) {
      return message.reply("Bạn không đủ quyền để sử dụng lệnh này");
    }

    userCommand.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

app.listen(PORT, () => console.log("LISTENING ON PORT", PORT));
client.login(TOKEN);
