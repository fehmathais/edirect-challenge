import express, {Request, Response} from 'express';
import {
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from "@fm-challenge/common";
import {Project} from "../models/project";

const router = express.Router();

router.delete(
    '/api/projects/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const project = await Project.findById(req.params.id);

        if (!project) {
            throw new NotFoundError();
        }

        if (project.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        project.set({
            deletedAt: new Date()
        });

        await project.save();

        res.send(project);
    });

export {router as DeleteProjectRouter};