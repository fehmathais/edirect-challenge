import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '@fm-challenge/common';
import { validateRequest } from '@fm-challenge/common';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('name')
            .not()
            .isEmpty()
            .withMessage('The name must be provided!'),
        body('email')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters!')
    ],
    validateRequest, 
async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new BadRequestError('This user already exists');
    }

    const user = User.build({name, email, password});
    await user.save();

    // Generate json web token
    const userJwt = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };
    
    res.status(201).send(user);
});

export {router as SignupRouter};