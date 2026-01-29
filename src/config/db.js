const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('Missing MONGO_URI in environment');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri);

  const { host, name } = mongoose.connection;
  console.log(`MongoDB connected: ${host}/${name}`);
}

module.exports = connectDB;
