var fs = require('fs')
var files = fs.readdirSync('./commands');
let allItems = [];
exports.run = (client, message, args) => {
    //send message of all options. 
   files.forEach(function(item, index) {
        var cur = item.indexOf(".");
        if (cur > 0) {
            allItems.push(item.substring(0, cur));
        } else {
            allItems.push(item);
        }
   });
   
    message.reply(allItems)
}