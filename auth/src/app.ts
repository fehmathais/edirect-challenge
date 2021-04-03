import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { SignupRouter } from './routes/signup';
import { SigninRouter } from './routes/signin';
import { NotFoundError } from '@fm-challenge/common';
import { errorHandler } from '@fm-challenge/common';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
}));

app.use(SignupRouter);
app.use(SigninRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};