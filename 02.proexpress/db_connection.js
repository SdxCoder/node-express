import mongoose from "mongoose";

const username = encodeURIComponent("mongodb123");
const password = encodeURIComponent("mongo123@#");
const uri = `mongodb+srv://${username}:${password}@locallibrary.2fxtp.mongodb.net/?retryWrites=true&w=majority&appName=locallibrary`;

export default async function connectMongose() {
    try {
        mongoose.set("strictQuery", "false");
        await mongoose.connect(uri);
        console.log('You successfully connected to MongoDB!')
    } catch (error) {
        await mongoose.disconnect()
    }
}

