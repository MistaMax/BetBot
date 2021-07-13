const db = require('./database');

module.exports.addBalance = async (client, id, ammnt) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = mm+'/'+dd+'/'+yyyy;
  const find = await db.getObjById(client, 'balance', id);
  if (find != null) {
    const sum = find.balance + ammnt;
    const result = db.updateObjById(client, 'balance', id, { balance: sum, lastClaimDate: formattedDate });
    return result;
  } else {
    const res = await db.add(client, 'balance', { _id: id, balance: ammnt, lastClaimDate: formattedDate });
    return res;
  }
};

module.exports.setBalance = async (client, id, ammnt) => {
  const find = await db.getObjById(client, 'balance', id);
  if (find != null) {
    //console.log(find);
    const result = db.updateObjById(client, 'balance', id, { balance: ammnt });
    //console.log(find);
    return result;
  } else {
    const res = await db.add(client, 'balance', { _id: id, balance: ammnt });
    return res;
  }
};

module.exports.getBalance = async (client, id) => await db.getObjById(client, 'balance', id);
module.exports.removeEntry = async (client, id) => await db.removeObjById(client, 'balance', id);