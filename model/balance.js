const db = require("./database");

module.exports.addBalance = async (client,id,ammnt) => {
    const find = await db.getObjById(client,"balance",id);
    if(find != null){
        const sum = find.balance + ammnt;
        console.log(find);
        db.updateObjById(client,"balance",id,{"balance":sum});
        console.log(find);
    }
    else{
        const res = await db.add(client,"balance",{"_id":id,"balance":ammnt});
    }
}

module.exports.getBalance = async (client,id) => {
    return await db.getObjById(client,"balance",id);
}