import { CreatedTaskEvent, Publisher, Subjects } from "@fm-challenge/common";

export class CreatedTaskPublisher extends Publisher<CreatedTaskEvent> {
    readonly subject = Subjects.TaskCreated;
}