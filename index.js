const fs = require("fs");
const Discord = require("discord.js");
require("dotenv").config();

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.BOT_PREFIX;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// client.guilds.cache.forEach((guild) => {
//     const USER_ID = "533193629683154944";

//     const user = guild.members.fetch(USER_ID); // This return null;

//     console.log(user);
//   });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(TOKEN);
