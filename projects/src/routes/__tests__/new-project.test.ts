import request from 'supertest';
import { app } from '../../app';
import {Project} from "../../models/project";

it('has a route handler listening to /api/projects for post requests', async () => {
    const response = await request(app)
        .post('/api/projects')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/projects')
        .send({})
        .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/projects')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/projects')
        .set('Cookie', global.signin())
        .send({title: ''})
        .expect(400);

    await request(app)
        .post('/api/projects')
        .set('Cookie', global.signin())
        .send({})
        .expect(400);
});

it('creates a project with valid inputs', async () => {
    let projects = await Project.find({});
    expect(projects.length).toEqual(0);

    const title = 'Testing Project';

    await request(app)
        .post('/api/projects')
        .set('Cookie', global.signin())
        .send({title})
        .expect(201);

    projects = await Project.find({});

    expect(projects.length).toEqual(1);
    expect(projects[0].title).toEqual(title);
});