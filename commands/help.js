const fs = require('fs');

const files = fs.readdirSync('./commands');
const allItems = [];
exports.run = (client, message, args) => {
  // send message of all options.
  files.forEach((item, index) => {
    const cur = item.indexOf('.');
    if (cur > 0) {
      allItems.push(item.substring(0, cur));
    } else {
      allItems.push(item);
    }
  });

  message.reply(allItems);
};
