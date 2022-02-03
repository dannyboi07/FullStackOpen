const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper.js');
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
}, 100000);

test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs');
    
    expect(response.body).toHaveLength(helper.blogs.length);
});

test('id exists', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach(blog => expect(blog.id).toBeDefined());
});

test('verify successful post', async () => {
    const newBlog = {
        title: "Verify successful post",
        author: "Daniel",
        url: "randomurl",
        likes: 12,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${helper.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
    expect(blogsAtEnd.map(blog => blog.title)).toContain("Verify successful post");
});

test('verifying like defaulting to 0', async () => {
    const blog = {
        title: "Verifying likes defaulting to 0",
        author: "Danny",
        url: "www.randomURL.com",
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${helper.token}`)
        .send(blog)
        .expect(201).expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    // console.log(blogsAtEnd);
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
    expect(blogsAtEnd.map(blog => blog.likes)).toContain(0);
});

test('verifying title, url input validation', async () => {
    const blog = {
        author: "Daniel",
        likes: 2
    };

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${helper.token}`)
        .send(blog)
        .expect(400)
});

test('verifying successful deletion', async () => {
    const noteToDeleteId = "5a422ba71b54a676234d17fb";

    await api.delete(`/api/blogs/${noteToDeleteId}`).expect(204);
});

test.only('verifying successful update', async () => {
    const noteToUpdate = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 100,
        __v: 0
    }

    await api.put(`/api/blogs/${noteToUpdate._id}`).send(noteToUpdate)
        .expect(200);

    const notesAtEnd = await helper.blogsInDb();
    
    expect(notesAtEnd.map(note => note.likes)).toContain(100);
});

test("Verify unsuccessful post", async () => {
    const newBlog = {
        title: "Verify successful post",
        author: "Daniel",
        url: "randomurl",
        likes: 12,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.blogs.length);
    expect(blogsAtEnd.map(blog => blog.title)).toContain("Type wars");
})

afterAll(() => {
    mongoose.connection.close();
});