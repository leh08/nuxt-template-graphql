const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "graphql";
client.connect();
console.log("Connected successfully to MongoDB server");
const db = client.db(dbName);

module.exports = db;
