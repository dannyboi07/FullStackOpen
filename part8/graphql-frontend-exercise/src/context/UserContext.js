import { createContext } from "react";

export const UserContext = createContext(null);

export const UserDispatchContext = createContext(null);

export function userReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return {
                ...action.data
            }
        case "LOGOUT":
            return null;
        default:
            return state
    };
};

export function dispatchLogin(dispatch, token) {
    localStorage.setItem("book-app-user-token", token);
    dispatch({
        type: "LOGIN",
        data: token
    });
};

export function dispatchLogout(dispatch) {
    localStorage.removeItem("book-app-user-token");
    dispatch({
        type: "LOGOUT"
    });
};