import mongoose from 'mongoose';

interface ProjectAttrs {
    title: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface ProjectDoc extends mongoose.Document {
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
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
        }
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
    return new Project({
        title: attrs.title,
        userId: attrs.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

const Project = mongoose.model<ProjectDoc, ProjectModel>('Projects', projectSchema);

export { Project };
