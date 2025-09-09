const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.URI;
const dbName = process.env.DATABASE;

let client;
let db;

async function connect() {
  try {
    if (db) return db; // reutilizar conexión ya abierta

    client = new MongoClient(uri);

    await client.connect();
    db = client.db(dbName);

    console.log(`✅ Conectado a MongoDB: ${dbName}`);
    return db;
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    throw error;
  }
}

async function disconnect() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log("🔌 Desconectado de MongoDB");
    }
  } catch (error) {
    console.error("❌ Error cerrando conexión:", error.message);
    throw error;
  }
}

module.exports = { connect, disconnect };