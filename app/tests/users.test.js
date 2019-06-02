const request = require('supertest');

const app = require('../app');

const models = require('../models/v1');

const { user1, setupDatabase, tearDown } = require('./fixtures/db');

jest.setTimeout(15000);

beforeEach(setupDatabase);

afterAll(tearDown);

describe("User account", () => {
    test("Should signup a new user", async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({
                name: "Enax KRB",
                email: "en4x@krb.com",
                password: "en4x@krb"
            })
            .expect(201);
    
        const user = await models.User.findOne({
            where: {
                id: response.body.user.id,
                status: 1
            }
        });

        expect(user).not.toBeNull();
    
        expect(response.body).toMatchObject({
            user: {
                name: 'Enax KRB',
                email: "en4x@krb.com"
            },
            token: user.token
        });
    
        expect(user.password).not.toBe('lels123');
    });
    
    test("Should login existing user", async() => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: user1.email,
                password: user1.password
            })
            .expect(200);
    
        const user = await models.User.findOne({
            where: {
                id: user1.id,
                status: 1
            }
        });
    
        expect(response.body.token).toBe(user.token);
    });
    
    test("Should not login non-existing user", async () => {
        await request(app)
            .post('/api/v1/users/login')
            .send({
                email: user1.email,
                password: user1.password + 'z'
            })
            .expect(401);
    });
});

describe("User Profile", () => {
    test("Should get the profile of user", async () => {
        await request(app)
            .get('/api/v1/users/me')
            .set('Authorization', `Bearer ${user1.token}`)
            .send()
            .expect(200);
    });
    
    test("Should delete the user profile", async () => {
        await request(app)
            .delete('/api/v1/users')
            .set('Authorization', `Bearer ${user1.token}`)
            .send()
            .expect(200);
    
        const user = await models.User.findOne({
            where: {
                id: user1.id,
                status: 1
            }
        });

        expect(user).toBeNull();
    });
});
