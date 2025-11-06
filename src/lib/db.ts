import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface Cached {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

let cached: Cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      cached.conn = mongoose.connection;
      return mongoose;
    });
  }

  try {
    await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached;
}

export async function withDB<T>(
  request: Request,
  handler: (req: Request) => Promise<T>
): Promise<T> {
  await connectToDatabase();
  return handler(request);
}