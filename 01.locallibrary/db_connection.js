import mongoose from "mongoose";
import { config } from "dotenv"

config();
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@locallibrary.2fxtp.mongodb.net/?retryWrites=true&w=majority&appName=locallibrary`;

export default async function connectMongose() {
    try {
        mongoose.set("strictQuery", "false");
        await mongoose.connect(uri);
        console.log('You successfully connected to MongoDB!')
    } catch (error) {
        console.log(error);
        await mongoose.disconnect()
    }
}

