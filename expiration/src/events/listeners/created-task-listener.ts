import { Listener, CreatedTaskEvent, Subjects } from "@fm-challenge/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class CreatedTaskListener extends Listener<CreatedTaskEvent> {
    readonly subject = Subjects.TaskCreated;
    queueGroupName = 'expiration-service';

    async onMessage(data: CreatedTaskEvent["data"], msg: Message) {
        const delay = new Date(data.expiration).getTime() - new Date().getTime();

        await expirationQueue.add({
            taskId: data.id
        },{
            delay
        });
        
        msg.ack();
    }
}