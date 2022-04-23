import { deleteBlog, getBlogs, likeBlog, makeBlog } from "../services/blogService";
import { setNotif } from "./notifReducer";

export default function blogReducer(state = [], action) {
    switch(action.type) {
        case "ADD_BLOG":
            return [ ...state, ...action.data ];
        case "LIKE_BLOG":
            return state.map(blog => blog.id === action.data.id ? action.data : blog);
        case "DEL_BLOG":
            return state.filter(blog => blog.id !== action.data);
        default:
            return state;
    };
};

function getBlogsThunk() {
    return async dispatch => {
        let response = null;
        try {
            response = await getBlogs();
        } catch (err) {
            console.error(err);
            return;
        };
        dispatch({
            type: "ADD_BLOG",
            data: response
        });
    };
};

function createBlogThunk(newBlog, token) {
    return async dispatch => {
        let response = null;
        try {

            response = await makeBlog(newBlog, token);
        } catch (err) {
            console.error(err);
            return;
        };
        dispatch(getBlogsThunk());
        dispatch(setNotif({
            message: `A new blog ${response.title} by ${response.author} is added`,
            type: "noErrorNotif"
        }, 5));
    };
};

function likeBlogThunk(newBlog, token) {
    return async dispatch => {
        let response = null;
        try {
            
            response = await likeBlog(newBlog, token);
        } catch (err) {
            console.error(err);
            return;
        }
        dispatch({
            type: "LIKE_BLOG",
            data: response
        });
        dispatch(setNotif({ 
            message: `Liked ${response.title}`, 
            type: "noErrorNotif"
        }, 5));
    };
};

function deleteBlogThunk(blogToDeleteId, token) {
    return async dispatch => {
        let response = null;

        try {
            
            response = await deleteBlog(blogToDeleteId, token);
        } catch (err) {
            console.error(err);
            return;
        };
        dispatch({
            type: "DEL_BLOG",
            data: blogToDeleteId
        });
        dispatch(setNotif({
            message: "Deleted blog",
            type: "noErrorNotif"
        }, 5));
    };
};

export {
    getBlogsThunk,
    createBlogThunk,
    likeBlogThunk,
    deleteBlogThunk
};