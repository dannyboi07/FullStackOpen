import { loginUser, registerUser } from "../services/userService";
import { setNotif } from "./notifReducer";

const loggedBlogAppUser = JSON.parse(window.localStorage.getItem("loggedBlogAppUser"));
// if (loggedBlogAppUser) {
//     initUser(JSON.parse(loggedBlogAppUser));
// };
export default function userReducer(state = loggedBlogAppUser || null, action) {
    switch(action.type) {
        case "LOG_USER":
        case "INIT_USER":
            return { ...action.data };
        case "LOGOUT_USER":
            return null;
        default:
            return state;
    };
};

function initUser(data) {
    return({
        type: "INIT_USER",
        data
    })
};

function registerUserThunk(userDetails) {
    return async dispatch => {
        // let response = null;
        try {
            await registerUser(userDetails);
        } catch (err) {
            console.error(err);
            dispatch(setNotif({
                message: "Username taken",
                type: "error",
            }, 5));
            return;
        };
        // window.alert("Successfully registered");
        dispatch(setNotif({
            message: "Successfully registered",
            type: "noErrorNotif"
        }, 5));
        return;
    };
}

function loginUserThunk(userDetails) {
    return async dispatch => {

        let response = null;
        try {
            
            response = await loginUser(userDetails);
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify({ ...response }));
        } catch (err) {
            console.error(err);
            dispatch(setNotif({
                message: err.response.data.error,
                type: "error"
            }, 5));
            return;
        }
        dispatch({
            type: "LOG_USER",
            data: response
        });
    };
};

function logoutUser() {
    window.localStorage.removeItem("loggedBlogAppUser");
    return({
        type: "LOGOUT_USER",
        data: null
    });
};

export {
    registerUserThunk,
    loginUserThunk,
    logoutUser
};