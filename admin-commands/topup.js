const balance = require('../model/balance');

exports.run = async (client, message, args) => {
  if (message.author.id === client.config.ownerid || client.config.admins.includes(message.author.id)) {
    await balance.addBalance(client, message.author.id, parseInt(args[0]));
    message.reply(`Added $${args[0]} to your balance.`);
  } else {
    message.channel.send(`You do not have the necessary permissions ${message.author.tag}`);
  }
};
