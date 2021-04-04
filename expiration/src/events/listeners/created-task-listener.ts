import { Listener, CreatedTaskEvent, Subjects } from "@fm-challenge/common";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<CreatedTaskEvent> {
    readonly subject = Subjects.TaskCreated;
    queueGroupName = 'expiration-service';

    async onMessage(data: CreatedTaskEvent["data"], msg: Message) {
        console.log(data)
        msg.ack();
    }
}