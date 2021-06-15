module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    if (!(message.channel.type === "dm")) {
      if (message.channel.name === "bets") {
        //check for logging information
        try {
          client.fs.appendFile('logs/' + message.createdAt.getFullYear() + '-' + message.createdAt.getMonth() + '-' + message.createdAt.getDate() + '.log', message.createdAt.getHours() + ':' + message.createdAt.getMinutes() + ':' + message.createdAt.getSeconds() + '|' + message.author.id + '|' + message.author.tag + '|' + message.content + '\n', (err) => {
            if (err) throw err;
            console.log('Writting message to file');
          });
        } catch (err) {
          client.fs.writeFile('logs/' + message.createdAt.getFullYear() + '-' + message.createdAt.getMonth() + '-' + message.createdAt.getDate() + '.log', message.createdAt.getHours() + ':' + message.createdAt.getMinutes() + ':' + message.createdAt.getSeconds() + '|' + message.author.id + '|' + message.author.tag + '|' + message.content + '\n', (err) => {
            if (err) throw err;
            console.log('Writting message to file');
          });
        }
        // Ignore messages not starting with the prefix (in config.json)
        if (message.content.indexOf(client.config.prefix) !== 0) return;
        // Our standard argument/command name definition.
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);
        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;
        // Run the command
        cmd.run(client, message, args);
      }
    } else {
      //only the owner can access this
      if (message.author.id !== client.config.ownerid) return;
      // Ignore messages not starting with the prefix (in config.json)
      if (message.content.indexOf(client.config.prefix) !== 0) return;
      // Our standard argument/command name definition.
      const argsa = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
      const commanda = argsa.shift().toLowerCase();
      // Grab the command data from the client.commands Enmap
      const cmda = client.commands.get(commanda);
      // If that command doesn't exist, silently exit and do nothing
      if (!cmda) {
        cmda = client.adminCommands.get(commanda);
        if (!cmda) return;
      }
      // Run the command
      cmda.run(client, message, argsa);
    }
  };