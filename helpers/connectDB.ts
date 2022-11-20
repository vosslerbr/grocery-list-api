/**
 * @description Connect to the database
 */

import mongoose from 'mongoose';

export default async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

    await mongoose.connect(process.env.MONGO_URI);

    console.log('[db]: Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
