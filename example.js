const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'intim-in-team';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, openConnection) {

  console.log("Connected successfully to server");

  const db = openConnection.db(dbName);

  db.collection("message").insert({name: "lalaland"})

  openConnection.close();
});
