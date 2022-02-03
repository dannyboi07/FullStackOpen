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
}

export default { registerUser, loginUser };