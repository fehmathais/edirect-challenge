import {Subjects} from "./subjects";

export interface CreatedTaskEvent {
    subject: Subjects.TaskCreated;
    data: {
        userId: string;
        email: string;
        type: string;
        verificationCode: string;
    }
}