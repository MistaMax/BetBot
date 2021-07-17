exports.run = (client, message, args) => {
  if (message.author.id === client.config.ownerid || client.config.admins.includes(message.author.id)) {
    message.channel.send(message.content.substring(client.config.prefix.length + 4, message.content.length));
    message.delete();
  } else {
    message.channel.send(`You do not have the necessary permissions ${message.author.tag}`);
  }
};
