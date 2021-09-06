const {Client, Collection, Intents} = require('discord.js');
const Enmap = require("enmap");

module.exports = class extends Client {
  constructor(config) {
    super({
      intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
    });
    this.commands = new Enmap();
    this.adminCommands = new Enmap();
    this.musiccommands = new Collection();

    this.queue = new Map();

    this.config = config;
  }
};