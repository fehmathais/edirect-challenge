import express, { Request, Response } from 'express';
import moment from 'moment';
import mongoose from "mongoose";
import { Task } from "../models/task";
import { body } from 'express-validator';
import { Project } from "../models/project";
import { CreatedTaskPublisher } from "../events/publishers/created-task-publisher";
import { 
    TaskStatus, 
    BadRequestError, 
    NotFoundError, 
    requireAuth, 
    validateRequest 
} from '@fm-challenge/common';
import { natsWrapper } from "../nats-wrapper";

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
        body('projectId')
            .not()
            .isEmpty()
            .custom(value => mongoose.Types.ObjectId.isValid(value))
            .withMessage('You must provide a valid project reference!'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {description, expiration, projectId} = req.body;
        
        const project = await Project.findById(projectId);
        
        if (!project) {
            throw new NotFoundError();
        }
        
        const currentDate = moment().format();
        
        if (expiration <= currentDate) {
            throw new BadRequestError('You must provide a valid expiration date!');
        }
        
        const task = Task.build({
            description,
            expiration,
            projectId,
            status: TaskStatus.Created
        });
        project.tasks.push(task);

        await task.save();
        await project.save();
        
        await new CreatedTaskPublisher(natsWrapper.client).publish({
            id: task._id,
            status: task.status,
            expiration: task.expiration,
            description: task.description,
        });
        
        
        res.status(201).send(task);
    });

export { router as NewTaskRouter };