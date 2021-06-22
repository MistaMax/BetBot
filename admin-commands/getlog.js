exports.run = (client, message, args) => {
  if (message.channel.type === 'dm' && (message.author.id === client.config.ownerid || client.config.admins.includes(message.author.id))) {
    message.channel.send(`${args[0]}.log`);
    message.channel.send('Sending log file', { files: [`logs/${args[0]}.log`] });
  }
};
