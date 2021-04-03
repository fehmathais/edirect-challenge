import express from 'express';
import {json} from 'body-parser';

import { SignupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(SignupRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listing on port 3000!!!');
});