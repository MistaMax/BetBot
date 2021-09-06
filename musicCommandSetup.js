//Music Bot Code provided by https://github.com/TannerGabriel/discord-bot
const Discord = require("discord.js");
const fs = require("fs");
const { Player } = require('discord-player');

module.exports = (client) => {
    //client.musiccommands = new Discord.Collection();

    //reads in the commands
    fs.readdir("./music/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./music/${file}`);
            let commandName = file.split(".")[0];
            console.log(`Attempting to load command ${commandName}`);
            client.commands.set(commandName, props);
        });
    });

    console.log(client.commands);

    const player = new Player(client);

    player.on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.on('connectionError', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on('trackStart', (queue, track) => {
        queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
    });

    player.on('trackAdd', (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.on('botDisconnect', queue => {
        queue.metadata.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
    });

    player.on('channelEmpty', queue => {
        queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
    });

    player.on('queueEnd', queue => {
        queue.metadata.send('✅ | Queue finished!');
    });

    client.once('ready', async () => {
        console.log('Ready!');
    });

    client.once('reconnecting', () => {
        console.log('Reconnecting!');
    });

    client.once('disconnect', () => {
        console.log('Disconnect!');
    });
    client.player = player;
    /*client.on('interactionCreate', async interaction => {
        const command = client.musiccommands.get(interaction.commandName.toLowerCase());

        try {
            if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
                command.execute(interaction, client);
            } else {
                command.execute(interaction, player);
            }
        } catch (error) {
            console.error(error);
            interaction.followUp({
                content: 'There was an error trying to execute that command!',
            });
        }
    });*/
};