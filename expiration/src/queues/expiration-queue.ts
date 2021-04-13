import Queue from 'bull';
import { natsWrapper } from "../nats-wrapper";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";

interface Payload {
    taskId: string;
}

const expirationQueue = new Queue<Payload>('task:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expirationQueue.process(async (job) => {
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
        taskId: job.data.taskId
    });
});

export {expirationQueue};