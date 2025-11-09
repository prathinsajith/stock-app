import mongoose from "mongoose";

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    console.log(`MongoDB connected successfully`);

    return cached.conn;
};
