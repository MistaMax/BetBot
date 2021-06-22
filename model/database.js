const { MongoClient } = require('mongodb');

module.exports.add = async (client, collection, obj) => {
  const uri = `mongodb+srv://${client.config.database.username}:${client.config.database.password}@${client.config.database.url}`;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await mclient.connect();
    const db = mclient.db(client.config.database.dbname);
    const result = await db.collection(collection).insertOne(obj);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    mclient.close();
  }
};

module.exports.getObjById = async (client, collection, id) => {
  const uri = `mongodb+srv://${client.config.database.username}:${client.config.database.password}@${client.config.database.url}`;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await mclient.connect();
    const result = await mclient.db(client.config.database.dbname)
      .collection(collection).findOne({ _id: id });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    throw new Error('The thingy has failed');
  } finally {
    mclient.close();
  }
};

module.exports.updateObjById = async (client, collection, id, update) => {
  const uri = `mongodb+srv://${client.config.database.username}:${client.config.database.password}@${client.config.database.url}`;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await mclient.connect();
    const db = mclient.db(client.config.database.dbname);
    const result = await db.collection(collection).updateOne({ _id: id }, { $set: update });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    mclient.close();
  }
};

/*module.exports.getObjByIdCallback = (client, collection, id, callback) => {
  const uri = `mongodb+srv://${client.config.database.username}:${client.config.database.password}@${client.config.database.url}`;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    mclient.connect((err) => {
      mclient.db(client.config.database.dbname).collection(collection).findOne({ _id: id }).then((obj) => { callback(obj); });
    });
  } catch (error) {
    throw new Error('The thingy has failed');
  } finally {
    mclient.close();
  }
};*/

module.exports.removeObjById = async (client, collection, id) => {
  const uri = `mongodb+srv://${client.config.database.username}:${client.config.database.password}@${client.config.database.url}`;
  const mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await mclient.connect();
    const db = mclient.db(client.config.database.dbname);
    const result = await db.collection(collection).deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    mclient.close();
  }
};