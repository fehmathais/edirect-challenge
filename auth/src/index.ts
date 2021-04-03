import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import {json} from 'body-parser';
import cookieSession from "cookie-session";

import { SignupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
}));

app.use(SignupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

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