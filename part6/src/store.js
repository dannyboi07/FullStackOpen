import { createStore, combineReducers, applyMiddleware } from 'redux';
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const reducer = combineReducers({ 
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
});
  
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// store.subscribe(() => {
//     console.log(store.getState());
// });

export default store;