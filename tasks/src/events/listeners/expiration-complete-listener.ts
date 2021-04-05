import { ExpirationCompleteEvent, Listener, Subjects, TaskStatus } from "@fm-challenge/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Task } from "../../models/task";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
        const task = await Task.findById(data.taskId);

        if (!task) {
            throw new Error('Task not found!');
        }

        if (task.status === TaskStatus.Done) {
            return msg.ack();
        }
        
        task.set({
            status: TaskStatus.Expired,
        });

        await task.save();
        msg.ack();
    }
}