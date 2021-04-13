import mongoose from 'mongoose';
import { TaskStatus } from "@fm-challenge/common";
import { ProjectDoc } from "./project";

interface TaskAttrs {
    description: string;
    expiration: Date;
    status: TaskStatus;
    projectId: ProjectDoc;
}

export interface TaskDoc extends mongoose.Document {
    description: string;
    expiration: Date;
    status: TaskStatus;
    projectId: ProjectDoc;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
    build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        expiration: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(TaskStatus),
            default: TaskStatus.Created
        },
        projectId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Projects' 
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
    return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>('Tasks', taskSchema);

export { Task };
