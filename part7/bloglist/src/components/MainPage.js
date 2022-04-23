import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Blogs from "./Blogs";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import Toggleable from "./Toggleable";
import User from "./User";
import Blog from "./Blog";
import Users from "./Users";
import { Link } from "react-router-dom";

function MainPage(props) {
    const name = useSelector(state => state.user.name);

    return (
        <>
            <nav>
                <Link to="/blogs">
                    Blogs
                </Link>

                <Link to="/users">
                    Users
                </Link>
            </nav>
            {
                props.errorMessage && (
                    <Notification errorMessage={props.errorMessage} />
                )
            }
            <h2>
                {name} logged in{" "}
                
                <button onClick={props.logOut}>
                    Logout
                </button>
            </h2>

            <Toggleable ref={props.blogRef} buttonLabel="Create new blog">
                <NewBlog createBlog={props.createBlog} />
            </Toggleable>

            <h3>Blogs</h3>

            <Switch>

                <Route path="/blogs/:id">
                    <Blog />
                </Route>
                
                <Route path="/users/:id">
                    <User />
                </Route>

                <Route path="/users">
                    <Users />
                </Route>

                <Route path={["/blogs", "/"]}>
                    <ul className="bloglist">
                        {
                            props.blogs.map((blog) => (
                            <Blogs
                                key={blog.id}
                                blog={blog}
                                blogLikes={props.blogLikes}
                                username={props.username}
                                deleteBlog={props.deleteBlog}
                            />
                            ))
                        }
                    </ul>
                </Route>

            </Switch>
        </>
    );
}

export default MainPage;

// import Toggleable from './Toggleable';

// function MainPage(props) {
//     return (
//         <>
//             { props.errorMessage && <Notification errorMessage={ props.errorMessage } /> }
//             <h2>{ props.name } logged in <button onClick={ props.logOut }>Logout</button></h2>
//             {/* <Toggleable blogRef={ props.ref } createBlogProps={ props.createBlogProps }/> */}
//             <NewBlog ref={ props.ref } createBlogProps={ props.createBlogProps } />
//             <h3>Blogs</h3>
//             <ul className="bloglist">
//                 { props.blogs.map(blog => <Blogs key={ blog.id } blog={ blog } />) }
//             </ul>
//         </>
//     )
// });
// { <NewBlog ref={ ref } createBlogProps={ props.createBlogProps } /> }
// { <div style={ hideWhenVisible }>
//     <button onClick={toggleVisibility}>New Blog</button>
// </div>
// <div style={ showWhenVisible }>
//     { props.children }
//     <button onClick={ toggleVisibility }>Cancel</button>
// </div> }
