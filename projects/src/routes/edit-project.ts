import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from "@fm-challenge/common";
import {Project} from "../models/project";

const router = express.Router();

router.put(
    '/api/projects/:id',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required!'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const project = await Project.findById(req.params.id);

        if (!project) {
            throw new NotFoundError();
        }

        if (project.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        project.set({
            title: req.body.title
        });

        await project.save();

        res.send(project);
    });

export {router as UpdateProjectRouter};