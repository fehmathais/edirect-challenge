import {app} from '../app';
import mongoose from 'mongoose';
import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'jwt_for_testing';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const name = 'Testing User';
    const email = 'test@test.com';
    const password = '1234';

    await request(app)
        .post('/api/users/signup')
        .send({name, email, password})
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({email, password})
        .expect(200);

    return response.get('Set-Cookie');
};