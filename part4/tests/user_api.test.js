const mongoose = require('mongoose');
const supertest = require('supertest');
const api = supertest(require('../app'));
const helper = require('./test_helper');
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany({});

    for (let user of helper.users) {
        let userObject = new User(user);
        await userObject.save();
    };
}, 100000);

describe('Checking user creation validation', () => {
    test('should fail, username too short', async () => {
        const user = {
            username: "da",
            name: "Dan",
            password: "daniel"
        }
        
        await api.post('/api/users')
            .send(user).expect(400);
    });

    test('should fail, password too short', async () => {
        const user = {
            username: "dan",
            name: "Dan",
            password: "da"
        }

        const result = await api.post('/api/users')
            .send(user).expect(400);
        expect(result.body.error).toContain('Username and password must be at least 3 characters long');
    });

    // test('should execute successfully', async () => {
    //     const user = {
    //         username: "dannytest",
    //         name: "DanTest",
    //         password: "dannytest"
    //     };

    //     const result = await api.post('/api/users')
    //         .send(user).expect(200);
    //     expect(result.body.username).toContain('dannytest');
    // });
});

afterAll(() => {
    mongoose.connection.close();
})