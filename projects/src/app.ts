import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { NewProjectRouter } from "./routes/new-project";
import { UpdateProjectRouter } from "./routes/edit-project";
import { ShowAllProjectsRouter } from "./routes/show-all-projects";
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
app.use(NewProjectRouter);
app.use(UpdateProjectRouter);
app.use(ShowAllProjectsRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};