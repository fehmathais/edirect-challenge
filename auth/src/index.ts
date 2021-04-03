import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import { SignupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(SignupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listing on port 3000!!!');
});