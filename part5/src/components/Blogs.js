import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

function Blogs({ blog, blogLikes, deleteBlog, username }) {
    const [visible, setVisible] = useState(false);
    const [blogTitleStyle, setBlogTitleStyle] = useState({ marginBottom: "1em" });
    
    const blogHeight = blog.user.username === username ? "9.5" : "7.5";
    const closingTimer = blog.user.username === username ? 520 : 440;
    const [styledDiv, setStyledDiv] = useState({ display: "none", height: blogHeight.concat("em"), overflow: "hidden", willChange: "height", transition: "height 200ms ease-in-out" });
    const buttonLabel = visible ? "Hide" : "View";
    const timeout = useRef(null);

    

    function toggleVisibility() {
        setVisible(!visible);
        clearTimeout(timeout.current);
    
        if (!visible) {
            timeout.current = setTimeout(() => { // Going from hidden to shown
                let interval;
                let height = 0.1;

                setTimeout(() => {
                    interval = setInterval(() => {

                        if (height < parseFloat(blogHeight)) {

                            setStyledDiv({ display: "block", height: height.toString().concat("em"), overflow: "hidden", willChange: "height", transition: "height 200ms ease-in-out" })
                            height += 0.1;
                        };
                    }, 1/10000);
                }, 0);

                setTimeout(() => {
                    setBlogTitleStyle({ marginBottom: "0em" });
                }, 350);

                setTimeout(() => {

                    clearInterval(interval);
                    setStyledDiv({ display: "block", overflow: "visible", height: height.toString().concat("em"), willChange: "height", transition: "height 200ms ease-in-out 0s"});
                }, 600/*750*/);
            }, 0);
        } else {

            timeout.current = setTimeout(() => { // Going from shown to hidden
                let interval;
                let height = parseFloat(blogHeight);

                setTimeout(() => {
     
                    interval = setInterval(() => {

                        if (height >= 0.1) {

                            setStyledDiv({ display: "block", overflow: "hidden", height: height.toString().concat("em"), willChange: "height", transition: "height 200ms ease-in-out" });
                            height -= 0.1;
                        };
                    }, 1/10000);
                }, 0);

                setTimeout(() => {

                    setBlogTitleStyle({ marginBottom: "1em" });
                }, closingTimer);

                setTimeout(() => {

                    clearInterval(interval);
                    setStyledDiv({ display: "none", height: "0", overflow: "hidden", willChange: "height", transition: "height 200ms ease-in-out" });
                }, 600/*785*/);
            }, 0);
        }
    };

    function likeBlog(e) {
        e.preventDefault();

        const newBlog = { 
            id: blog.id,
            title: blog.title, 
            author: blog.author, 
            url: blog.url,
            likes: blog.likes + 1 
        };

        blogLikes(newBlog);
    };

    function removeBlog(e) {
        e.preventDefault();

        if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog);
        };
    };
    // console.log(blog.author, blog.user.username, username);
    
    return (
        <div className="blogItemContainer">
            <li className="blogitem">
                <p className="blog-title" style={ blogTitleStyle }>{ blog.title } by { blog.author } 
                    <button className="toggle-blog" onClick={ toggleVisibility }>{ buttonLabel }</button>
                </p>
                <div style={ styledDiv } className="transitionDivClass" >
                    <p style={{ display: "block" }}> { blog.url } </p>
                    <p className="likeCount">Likes: { blog.likes } 
                        <button id="like-btn" onClick={ likeBlog }>Like</button>
                    </p>
                    <p>{ blog.user.name }</p>
                    { blog.user.username === username && <button id="delete" onClick={ removeBlog }>Delete</button> }
                </div>
                <p style={{ "visibility": "hidden" }} id="id">{ blog.id }</p> 
            </li>
        </div>
    );
};
// The id is only displayed during cypress testing
export default Blogs;

Blogs.propTypes = {
    blog: PropTypes.object.isRequired,
    blogLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired   
};