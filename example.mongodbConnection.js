const config = require("./config.json");
const MongoClient = require('mongodb').MongoClient;
const client = {};
client.config = config;
const uri = "mongodb+srv://"+client.config.database.username+":"+client.config.database.password+"@"+client.config.database.url;
const database = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
database.connect(err => {
  const collection = database.db(client.config.database.dbname).collection("bets");//pulling from the collection(table) bets from the database
  // perform actions on the collection object
  database.close();
});