import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

async function getBlogs() {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
};

async function getBlog(blogId) {
    const response = await axios.get(`${baseUrl}/${blogId}`);
    return response.data;
}

async function makeBlog(blog, token) {
    const response = await axios.post(`${baseUrl}`, blog, { headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
};

async function likeBlog(blog, token) {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, { headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
};

async function commentBlog(blogId, comment, token) {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
};

async function deleteBlog(blogId, token) {
    const response = await axios.delete(`${baseUrl}/${blogId}`, { headers: {'Authorization': `Bearer ${token}`} });
    return response.data;
}

export { 
    getBlogs,
    getBlog, 
    makeBlog, 
    likeBlog,
    commentBlog, 
    deleteBlog 
};