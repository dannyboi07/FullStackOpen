import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import notifReducer from "./reducers/notifReducer";

const reducer = combineReducers({
    user: userReducer,
    blogs: blogReducer,
    notif: notifReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)) 
);

export default store;