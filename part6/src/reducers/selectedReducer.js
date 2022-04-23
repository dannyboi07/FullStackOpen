function randomAnec() {
    return Math.floor(Math.random() * 7);
}

function selectedReducer(state = randomAnec(), action) {
    
    switch (action.type) {
        case "RANDOMIZE":
            let anecNum = state;
            while ( anecNum === state ) {
                anecNum = randomAnec();
                if (anecNum !== state) {
                    return state = anecNum;
                };
            };
            break;
        default:
            return state;
    };
};

export function nextAnec() {
    return {
        type: "RANDOMIZE",
        data: null
    }
}

export default selectedReducer;