import request from 'supertest';
import { app } from "../../app";
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/projects/${id}`)
        .send({title: 'Testing update title'})
        .set('Cookie', global.signin())
        .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/projects/${id}`)
        .send({title: 'Testing update title'})
        .expect(401);
});

it('return a 401 if the user does not own the project', async () => {
    const response = await request(app)
        .post('/api/projects')
        .set('Cookie', global.signin())
        .send({title: 'Testing update title'});

    await request(app)
        .put(`/api/projects/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({title: 'Testing update title'})
        .expect(401);
});

it('return a 400 if the user provides an invalid title', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/projects')
        .set('Cookie', cookie)
        .send({title: 'Testing update title'});


    await request(app)
        .put(`/api/projects/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: ''})
        .expect(400);
});

it('updates the project provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/projects')
        .set('Cookie', cookie)
        .send({title: 'teste123'});

    const updatedResponse = await request(app)
        .put(`/api/projects/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: 'Testing update title'})
        .expect(200);

    expect(updatedResponse.body.title).toEqual('Testing update title');
});
