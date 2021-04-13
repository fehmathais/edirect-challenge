import request from 'supertest';
import { app } from "../../app";
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .delete(`/api/projects/${id}`)
        .set('Cookie', global.signin())
        .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .delete(`/api/projects/${id}`)
        .expect(401);
});

it('return a 401 if the user does not own the project', async () => {
    const response = await request(app)
        .post('/api/projects')
        .send({title: 'Testing update title'});

    await request(app)
        .delete(`/api/projects/${response.body.id}`)
        .send({title: 'Testing update title'})
        .expect(401);
});

it('delete the project', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/projects')
        .set('Cookie', cookie)
        .send({title: 'teste123'});

    const deletedResponse = await request(app)
        .delete(`/api/projects/${response.body.id}`)
        .set('Cookie', cookie)
        .expect(200);

    expect(deletedResponse.body.deletedAt).not.toBeNull();
});
