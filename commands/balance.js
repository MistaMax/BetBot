const balance = require("../model/balance");

exports.run = async (client, message, args) => {
    const money = await balance.getBalance(client,message.author.id);
    let msg = "";
    if(money==null){
        msg = "Could not find user for "+message.author.tag;
    }
    else{
        msg = `Your balance is \$${money.balance} \@`+message.author.tag;
    }
    message.channel.send(msg);
}