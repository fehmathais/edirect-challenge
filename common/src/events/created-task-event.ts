import {Subjects} from "./subjects";

export interface CreatedTaskEvent {
    subject: Subjects.TaskCreated;
    data: {
        id: string;
        status: string;
        expiration: Date;
        description: string;
    }
}