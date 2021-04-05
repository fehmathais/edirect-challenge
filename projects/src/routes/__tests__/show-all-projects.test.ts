import request from 'supertest';
import {app} from "../../app";

const createProject = (cookie: any) => {
    return request(app)
        .post('/api/projects')
        .set('Cookie', cookie)
        .send({title: 'abc123'});
}

it('can fetch and list of projects', async () => {
    const cookie = global.signin();
    
    await createProject(cookie);
    await createProject(cookie);
    await createProject(cookie);

    const response = await request(app)
        .get('/api/projects')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});