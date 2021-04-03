import mongoose from 'mongoose';
import {app} from "./app";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const start = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined!');
    }

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined!');
    }

    try {
        await mongoose.connect(process.env.MONGO_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to mongodb...');
    } catch (e) {
        throw new DatabaseConnectionError();
    }

    app.listen(3000, () => {
        console.log('Listing on port 3000!!!');
    });
}

start();