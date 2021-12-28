import axios from "axios";

const baseURL = 'http://localhost:3001/persons'

function getAll() {
    const request = axios.get(baseURL)
    return request.then(req => req.data);
}

function create(newPerson) {
    const request = axios.post(baseURL, newPerson);
    return request.then(req => req.data);
}

function update(id, updatedPerson) {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson);
    return request.then(req => req.data);
}

function remove(id) {
    axios.delete(`${baseURL}/${id}`);
    return;
}

export default { getAll, create, remove, update }