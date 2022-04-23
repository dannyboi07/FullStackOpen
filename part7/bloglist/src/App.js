import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Homepage from "./components/Homepage";
// import userService from "./services/userService";
// import blogService from "./services/blogService";
import MainPage from "./components/MainPage";
import {
    createBlogThunk,
    deleteBlogThunk,
    getBlogsThunk,
    likeBlogThunk,
} from "./reducers/blogReducer";
import {
    loginUserThunk,
    logoutUser,
    registerUserThunk,
} from "./reducers/userReducer";
import { setNotif } from "./reducers/notifReducer";

function App() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // const [user, setUser] = useState(null);
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [blogs, setBlogs] = useState([]);

    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blogs);
    const errorMessage = useSelector((state) => state.notif);

    const createBlogRef = useRef();

    function sortBlogs(allBlogs) {
        return allBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    }

    useEffect(() => {
        if (user) {
            dispatch(getBlogsThunk());
        }
        // const loggedBlogAppUser = window.localStorage.getItem("loggedBlogAppUser");

        // if (loggedBlogAppUser) {
        //     setUser(JSON.parse(loggedBlogAppUser));
        //     console.log(user);
        //     getAllBlogs();
        // };
    }, [user]);

    //   function errNotif(str, type) {
    //     setErrorMessage({ message: str, color: type });
    //     setTimeout(() => {
    //       setErrorMessage(null);
    //     }, 5000);
    //   };

    function handleUserRegister(e) {
        e.preventDefault();
        if (registerUsername.length < 3 || registerPassword.length < 3) {
            // errNotif("Minimum length of username or password is 3 characters");
            dispatch(
                setNotif(
                    {
                        message:
                            "Minimum length of username or password is 3 characters",
                        type: "error",
                    },
                    5
                )
            );
            return;
        }
        dispatch(
            registerUserThunk({
                name,
                username: registerUsername,
                password: registerPassword,
            })
        );
        // try {
        //   const registerReponse = await userService.registerUser({ name, username: registerUsername, password: registerPassword })
        //   console.log("register Con:",registerReponse);
        //   setName("");
        //   setRegisterUsername("");
        //   setRegisterPassword("");
        //   // setUser(registerReponse);
        //   // setLoginUsername("danny");
        //   // setLoginPassword("danny");
        //   // console.log("Login:", typeof(loginUsername), loginUsername);
        //   // await handleUserLogin();
        // } catch(err) {
        //   errNotif("Username taken", "error");
        // };
    }

    function handleUserLogin(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        dispatch(
            loginUserThunk({ username: loginUsername, password: loginPassword })
        );
        // try {
        //   const loginResponse = await userService.loginUser({ username: loginUsername, password: loginPassword });
        //   setUser(loginResponse);
        //   window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(loginResponse));

        //   setLoginUsername("");
        //   setLoginPassword("");
        //   getAllBlogs();
        // } catch(err) {
        //   errNotif(err.response.data.error, "error");
        // };
    }

    function getAllBlogs() {
        dispatch(getBlogsThunk());
        // try {
        //   setBlogs(sortBlogs(await blogService.getBlogs()));
        // } catch(err) {
        //   console.log(err, "error");
        // };
    }

    function createBlog(newBlog) {
        dispatch(createBlogThunk(newBlog, user.token));
        // try {
        //   const response = await blogService.makeBlog(newBlog, user.token);
        //     getAllBlogs();
        //   // setBlogs(blogs.concat(response));
        //   createBlogRef.current.toggleVisibility();

        //   errNotif(`A new blog ${response.title} by ${response.author} is added`, "noErrorNotif");
        // } catch(err) {
        //   console.error(err);
        // };
    }

    async function blogLikes(newBlog) {
        dispatch(likeBlogThunk(newBlog, user.token));
        // try {
        //   const updatedBlog = await blogService.likeBlog(newBlog, user.token);
        //   // First going through blogs to find and replace updated blog, and then sort the array returned by map by the latest count of likes
        //   setBlogs( sortBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog) ));

        //   errNotif(`Liked ${updatedBlog.title}`, "noErrorNotif");
        // } catch(err) {
        //   console.error(err);
        // };
    }

    async function deleteBlog(blogToDelete) {
        // e.preventDefault();
        dispatch(deleteBlogThunk(blogToDelete.id, user.token));
        // try {
        //   blogService.deleteBlog(blogToDelete.id, user.token);
        //   setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
        //   errNotif(`Deleted ${blogToDelete.title} by ${blogToDelete.author}`, "noErrorNotif");
        // } catch(err) {
        //   console.error(err);
        // };
    }

    async function logOut(e) {
        e.preventDefault();
        dispatch(logoutUser());
        // window.localStorage.removeItem("loggedBlogAppUser");
        // setUser(null);
    }

    const registerProps = {
        className: "formbox",
        handleUserRegister,
        name,
        setName,
        username: registerUsername,
        setUsername: setRegisterUsername,
        password: registerPassword,
        setPassword: setRegisterPassword,
    };

    const loginProps = {
        handleUserLogin,
        username: loginUsername,
        setUsername: setLoginUsername,
        password: loginPassword,
        setPassword: setLoginPassword,
    };

    return (
        <div className="App">
            <h1>Blog App</h1>
            {user === null 
            ?   <Homepage
                    errorMessage={errorMessage}
                    registerProps={registerProps}
                    loginProps={loginProps}
                />
            :   <MainPage
                    username={user.username}
                    errorMessage={errorMessage}
                    blogs={blogs}
                    createBlog={createBlog}
                    logOut={logOut}
                    blogRef={createBlogRef}
                    blogLikes={blogLikes}
                    deleteBlog={deleteBlog}
                />
            }
        </div>
    );
}

export default App;
