const request = require('supertest');

const app = require('../app');

const models = require('../models/v1');

const { user1, setupDatabase, tearDown } = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(tearDown);

jest.setTimeout(13000);

test("Should create task for user", async () => {
    const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${user1.token}`)
        .send({
            description: "Die!!",
            name: "Die?"
        })
        .expect(201);

    const task = await models.Task.findOne({
        where: {
            id: response.body.id,
            status: 1
        }
    });

    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
}); 