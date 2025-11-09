import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

const uri = process.env.MONGODB_URI;
const options = {
    maxPoolSize: 10,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

// Create MongoDB client
const mongoClient = new MongoClient(uri, options);

// Get the database instance (this is synchronous, connection happens on first operation)
const db = mongoClient.db();

// Export the database for better-auth
export const database = db;

// Export the client
export const client = mongoClient;

// Export client promise for cases where you need to ensure connection
export const clientConnected = mongoClient.connect();

// Export database getter function
export function getDatabase() {
    return db;
}

export default database;
