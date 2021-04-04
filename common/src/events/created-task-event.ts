import {Subjects} from "./subjects";

export interface CreatedTaskEvent {
    subject: Subjects.TaskCreated;
    data: {
        description: string;
        expiration: Date;
        status: string;
        projectId: string;
    }
}