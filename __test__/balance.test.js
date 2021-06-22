const balance = require('../model/balance');
const config = require('../config');
const client = {"config":config};
//sets timeouts, connecting to the database takes time
jest.setTimeout(20000);
//runs the database test
it("Adding entry with _id 1 to the balance collection, testing find functionality, update functionality, then removing functionality",async () => {
    //testing add functionality
    await balance.addBalance(client, "1", 200);
    //testing search functionality
    let result = await balance.getBalance(client,"1");
    expect(result._id).toEqual("1");
    //testing update
    await balance.addBalance(client, "1", 200);
    result = await balance.getBalance(client,"1");
    expect(result.balance).toEqual(400);
    //testing remove functionality
    await balance.removeEntry(client, "1");
    result = await balance.getBalance(client,"1");
    expect(result).toEqual(null);
});