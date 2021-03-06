import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { NewTaskRouter } from "./router/new-task";
import { currentUser, NotFoundError, errorHandler } from '@fm-challenge/common';

const app = express();

app.use(json());
app.use(cors());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.use(currentUser);
app.use(NewTaskRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};