function filterReducer(state = "", action) {
    switch (action.type) {
        case "EMPTY":
            return state = action.data;
        case "FILTER":
            return state = action.data;
        default:
            return state;
    }
};

export function sendFilter(type, data) {
    return {
        type,
        data
    }
};

export default filterReducer;