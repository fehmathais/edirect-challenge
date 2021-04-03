import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234123'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '4123124',
            password: '1234123'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '4123124',
            password: 123
        })
        .expect(400);
});

it('returns a 400 with missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: '123412'
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '233214'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '233214'
        })
        .expect(400)
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});