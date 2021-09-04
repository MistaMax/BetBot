exports.run = async (client, message, args) => {
    if(args.length == 0){
        message.reply("Please add additional arguments");
        return;
    }
    message.reply(args);
};
  