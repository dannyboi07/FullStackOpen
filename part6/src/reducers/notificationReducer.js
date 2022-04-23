function notificationReducer(state = "", action) {
    switch (action.type) {
        case "SHOW_NOTIF":
            return action.message;
        case "HIDE_NOTIF":
            return state = "";
        default:
            return state;
    };
};

let timer = null;

export function setNotification(type, message, displayTime) {
    if (timer) clearTimeout(timer);
    return dispatch => {
        dispatch({
            type,
            message
        });

        timer = setTimeout(() => {
            dispatch({
                type,
                message: null
            })
        }, displayTime * 1000);
    };
};

export default notificationReducer;