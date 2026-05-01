const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');

async function wipeDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI configured in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Connected to DB:', db.databaseName);
    console.log('Found collections:', collections.map((c) => c.name));

    if (collections.length === 0) {
      console.log('No collections found. Nothing to drop.');
    } else {
      await db.dropDatabase();
      console.log('✅ Database dropped successfully.');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Failed to wipe database:', error.message);
    process.exit(1);
  }
}

wipeDatabase();
