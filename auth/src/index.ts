import express from 'express';
import {json} from 'body-parser';

import { SignupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(SignupRouter);

app.listen(3000, () => {
    console.log('Listing on port 3000!');
});