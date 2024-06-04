import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

import loadSchemas from './utils/loadSchemas';

// ENV variables
dotenv.config({ path: './.env' });
const PORT = process.env.PORT;
const DB_URI = process.env.DATABASE_URI as string;

// DataBase
const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected 🚀');
  } catch (error) {
    console.log('Error 💥: ', error);
  }
};

app.listen(PORT, () => {
  connectDb().then(() => loadSchemas());
  console.log(`Server Running on Port ${PORT}...`);
});
