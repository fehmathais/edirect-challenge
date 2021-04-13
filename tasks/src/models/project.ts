import mongoose from 'mongoose';
import { TaskDoc } from "./task";

interface ProjectAttrs {
    title: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    tasks: TaskDoc[]
}

export interface ProjectDoc extends mongoose.Document {
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    tasks: TaskDoc[]
}

interface ProjectModel extends mongoose.Model<ProjectDoc> {
    build(attrs: ProjectAttrs): ProjectDoc;
}

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true
        },
        createdAt: {
            type: mongoose.Schema.Types.Date,
        },
        updatedAt: {
            type: mongoose.Schema.Types.Date,
        },
        deletedAt: {
            type: mongoose.Schema.Types.Date,
        },
        tasks: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' }
        ]
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

projectSchema.statics.build = (attrs: ProjectAttrs) => {
    return new Project(attrs);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>('Projects', projectSchema);

export { Project };
