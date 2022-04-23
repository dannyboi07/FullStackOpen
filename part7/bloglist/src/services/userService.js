import axios from "axios";
const baseUrl = "http://localhost:3003/api";

async function registerUser(userDetails) {
    const response = await axios.post(`${baseUrl}/users`, userDetails);
    return response.data;
};

async function loginUser(userDetails) {
    // try {
    //     const response = await axios.post(`${baseUrl}/login`, userDetails);
    //     return response.data;
    // } catch(err) {
    //     console.log(Object(err));
    //     console.log(err.response.data);
    //     return err.response.data;
    // }
    const response = await axios.post(`${baseUrl}/login`, userDetails);
    return response.data;
};

async function getUsers() {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
}

async function getUser(userId) {
    const response = await axios.get(`${baseUrl}/users/${userId}`);
    return response.data;
};

export { 
    registerUser, 
    loginUser,
    getUsers,
    getUser 
};