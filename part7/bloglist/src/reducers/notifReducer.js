export default function notifReducer(state = null, action) {
    switch (action.type) {
        case "SET_NOTIF":
            return { 
                message: action.data.message,
                color: action.data.type
            }
        case "CLR_NOTIF":
            return null;
        default:
            return state;
    };
};

let timer = null

function setNotif(data, time) {
    if (timer) clearTimeout(timer);

    return dispatch => {
        dispatch({
            type: "SET_NOTIF",
            data
        })

        timer = setTimeout(() => {
            dispatch(clrNotif());
        }, 1000 * time);
    }
};

function clrNotif() {
    return({
        type: "CLR_NOTIF",
        data: null
    });
};

export {
    setNotif
};