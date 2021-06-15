exports.run = (client, message, args) => {
    if (message.channel.type === "dm" && message.author.id === client.config.ownerid){
        var path = './logs/'+args[0]+'.log';
        try{
            client.currlog = client.llog.loadLog(path);
            message.channel.send('Log set to ' + path);
        }
        catch(error){
            message.channel.send('there was a problem loading the log');
        }
    }
}