import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { body } from 'express-validator';
import { Password } from '../services/password';
import {validateRequest} from '@fm-challenge/common';
import {BadRequestError} from '@fm-challenge/common';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must apply a password')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    // Generate json web token
    const userJwt = jwt.sign({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);
});

export {router as SigninRouter};