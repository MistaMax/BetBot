const balance = require("../model/balance");

exports.run = (client, message, args) => {
    if(message.author.id===client.config.ownerid || client.config.admins.includes(message.author.id))
    {
        //add stuff for incrementing balance here
    }
    else
    {
        message.channel.send("You do not have the necessary permissions " + message.author.tag);
    }
}