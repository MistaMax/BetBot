const balance = require('../model/balance');

exports.run = async (client, message, args) => {
  const claimAmmount = 200.00;
  const user = await balance.getBalance(client, message.author.id);
  let msg = '';
  if (money == null) {
    message.reply(`Could not find user for ${message.author.tag}`);
    return;
  }
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = mm+'/'+dd+'/'+yyyy;
  if(user.lastClaimDate.localeCompare(formattedDate) != 0){
    balance.addBalance(client,message.author.id, claimAmmount);
    msg = `Your balance has been claimed for the day!  Your current balance is now ${user.balance+claimAmmount}!`;
  }
  else{
    msg = `You have already claimed your money for the day.  Your balance remains ${user.balance}.`;
  }
  message.reply(msg);
};