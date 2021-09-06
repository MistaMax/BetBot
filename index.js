const Discord = require("discord.js");
const fs = require("fs");
//const client = new Discord.Client();
const Client = require("./client/Client.js");
const config = require("./config.json");
const llog = require("./datastruct/loadedlog.js");
const client = new Client(config);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
//client.config = config;
client.fs = fs;
client.llog = llog;
client.currlog = llog.loadLog('./logs/default.log');
//add queuing to bot
//client.queue = new Map();
//Begin running the bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//reads in the events
fs.readdir("./evs/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const ev = require(`./evs/${file}`);
    let evName = file.split(".")[0];
    client.on(evName, ev.bind(null,client));
  });
});

//reads in the commands

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//reads in the admin commands
fs.readdir("./admin-commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./admin-commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);