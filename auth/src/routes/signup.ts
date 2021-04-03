import express, {Request, Response} from 'express';
import {body} from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
    '/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters!')
], validateRequest, (req: Request, res: Response) => {
        const {email, password} = req.body;

        res.status(201).send({email, password});
});

export {router as SignupRouter};