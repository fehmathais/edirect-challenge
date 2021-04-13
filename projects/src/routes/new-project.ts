import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@fm-challenge/common';
import {body} from 'express-validator';
import {Project} from "../models/project";

const router = express.Router();

router.post(
    '/api/projects',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required!'),
    ],
    validateRequest,
async (req: Request, res: Response) => {
    const {title} = req.body;
    
    const project = Project.build({
        title,
        userId: req.currentUser!.id,
    });
    
    await project.save();
    
    res.status(201).send(project);
});

export { router as NewProjectRouter };