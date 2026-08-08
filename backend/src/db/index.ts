import mongoose from 'mongoose';
import config from '../config/index.js';

let isConnected = false;

export async function connect() {
  const uri = config.MONGO_URI;
  mongoose.set('strictQuery', false);
  console.log("uri",uri)
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
}

export async function disconnect() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected');
  }
}

export function connectionState() {
  return mongoose.connection.readyState; // 0 disconnected,1 connected,2 connecting,3 disconnecting
}

export default { connect, disconnect, connectionState };
