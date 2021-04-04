import express, { Request, Response } from 'express';
import moment from 'moment';
import {body} from 'express-validator';
import { requireAuth, validateRequest } from '@fm-challenge/common';

const router = express.Router();

router.post(
    '/api/tasks',
    requireAuth,
    [
        body('description')
            .not()
            .isEmpty()
            .withMessage('Description is required!'),
        body('expiration')
            .custom(value => moment(value).isValid())
            .withMessage('Expiration must be a valid date!'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {description, expiration} = req.body;
        res.status(201).send({description, expiration});
    });

export { router as NewTaskRouter };