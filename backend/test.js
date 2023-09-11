const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server URI

// Database and Collection names
const dbName = 'test_db';
const collectionName = 'test_coll';



async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    // Access your database and collection                                            
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Now you can perform database operations
    // For example, you can insert a document
    const result = await collection.insertOne({ key: 'value' });
    console.log(`Inserted ${result.insertedCount} document(s)`);

    // Close the connection
    client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the connectToMongoDB function
connectToMongoDB();


// Call the connectToMongoDB function
connectToMongoDB();
