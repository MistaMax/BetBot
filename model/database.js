const MongoClient = require('mongodb').MongoClient;

module.exports.add = async (client, collection, obj) => {
    const uri = "mongodb+srv://"+client.config.database.username+":"+client.config.database.password+"@"+client.config.database.url;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await mclient.connect();
        const db = mclient.db(client.config.database.dbname);
        const result = await db.collection(collection).insertOne(obj);
        console.log(`Inserted obj with id: ${result}`);
    }
    catch(err){
        console.log(err)
    }
    finally{
        mclient.close();
    }
}

module.exports.getObjById = async (client, collection, id) => {
    const uri = "mongodb+srv://"+client.config.database.username+":"+client.config.database.password+"@"+client.config.database.url;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await mclient.connect();
        const result = await mclient.db(client.config.database.dbname).collection(collection).findOne({"_id":id});
        if(result){
            return result;
        }
        else{
            return null;
        }
    }
    catch(error){
        throw new Error("The thingy has failed")
    }
    finally{
        mclient.close();
    }
}

module.exports.updateObjById = async (client, collection, id, update) => {
    const uri = "mongodb+srv://"+client.config.database.username+":"+client.config.database.password+"@"+client.config.database.url;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        await mclient.connect();
        const db = mclient.db(client.config.database.dbname);
        const result = await db.collection(collection).updateOne({"_id":id},{$set:update});
    }
    catch(err){
        console.log(err)
    }
    finally{
        mclient.close();
    }
}

module.exports.getObjByIdCallback = (client, collection, id, callback) => {
    const uri = "mongodb+srv://"+client.config.database.username+":"+client.config.database.password+"@"+client.config.database.url;
    const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
        mclient.connect((err)=>{
            mclient.db(client.config.database.dbname).collection(collection).findOne({"_id":id}).then((obj)=>{callback(obj)});
        });
    }
    catch(error){
        throw new Error("The thingy has failed")
    }
    finally{
        mclient.close();
    }
}