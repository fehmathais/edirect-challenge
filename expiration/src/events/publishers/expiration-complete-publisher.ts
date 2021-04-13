import { ExpirationCompleteEvent, Publisher, Subjects } from "@fm-challenge/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}