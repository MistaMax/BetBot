const db = require("./database");

module.exports.addBalance = async (client,id,ammnt) => {
    const find = await getBalance(id);
    if(find != null){
        //update here
        console.log(find);
    }
    else{
        const res = await db.add(client,"balance",{"_id":id,"balance":ammnt});
    }
}

module.exports.getBalance = async (client,id) => {
    return await db.getObjById(client,"balance",id);
}