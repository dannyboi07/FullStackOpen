import axios from "axios";

const baseUrl = "http://localhost:5002/anecdotes";

async function getAll() {
    const response = await axios.get(baseUrl);
    return response.data;
};

async function createAnec(anecdote) {
    const anecObj = { content: anecdote, votes: 0 };
    const response = await axios.post(baseUrl, anecObj);
    return response.data;
}

async function voteAnec(anecId, anecVotes) {
    const anecObj = { votes: anecVotes };
    const response = await axios.patch(`${baseUrl}/${anecId}`, anecObj);
    return response.data;
}

const anecdoteService = { getAll, createAnec, voteAnec };

export default anecdoteService;