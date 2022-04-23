import anecdoteService from "../services/anecdoteService";

export default function voteReducer(state = [], action) {
    switch (action.type) {
        case "VOTE":
            const anecLen = state.length;
            let tempAnec = [];
            for (let i = 0; i < anecLen; i++ ) {
                if ( state[i].id !== action.data.id ) {
                    tempAnec.push(state[i]);
                }
                else if ( state[i].id === action.data.id ) {
                    const updatedAnec = {
                        content: state[i].content,
                        id: state[i].id,
                        votes: state[i].votes + 1
                    }
                    tempAnec.push(updatedAnec);
                };
            };
            return state = tempAnec;
        case "INIT_ANECDOTES":
            return action.data;
        case "ADD":
            return state = [...state, action.data ];
        default:
            return state;
    };
};

function vote( id, votes ) {
    return async dispatch => {
        await anecdoteService.voteAnec(id, votes);
        return dispatch({
            type: "VOTE",
            data: { id }
        });
    }
    
};

function formatNewAnec(anec) {
    return async dispatch => {
        const newAnec = await anecdoteService.createAnec(anec);
        return dispatch({
            type: "ADD",
            data: newAnec
        });
    };
};

function initializeAnecdotes() {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        return dispatch({
            type: "INIT_ANECDOTES",
            data: anecdotes
        })
    };
};

export { vote, initializeAnecdotes, formatNewAnec };