import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { setNotif } from "../reducers/notifReducer";
import { commentBlog, getBlog, likeBlog } from "../services/blogService";

function Blog() {
    const dispatch = useDispatch();
    const params = useParams();

    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState("");

    const userToken = useSelector(state => state.user.token);

    useEffect(() => {

        if (params.id) {
            getBlog(params.id)
                .then(res => setBlog(res))
                .catch(err => console.error(err));
        };

    }, []);

    function likeaBlog() {
        const newBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        };
        likeBlog(newBlog, userToken)
            .then(res => {
                setBlog(res);
                dispatch(setNotif({
                    message: `Liked ${res.title}`,
                    type: "noErrorNotif"
                }, 5));
            })
            .catch(err => console.error(err));
    };

    function commentSubmit(e) {
        e.preventDefault();

        if (comment === "" || comment === " ") {
            dispatch(setNotif({
                message: "Comment is empty",
                type: "error"
            }, 5));
            return;
        };

        commentBlog(blog.id, { comment }, userToken)
            .then(res => {
                setBlog({
                    ...blog,
                    comments: [
                        ...blog.comments,
                        comment
                    ],
                })
            })
            .catch(err => console.error(err));
        return;
    };
    return (
        <div>
            <h1>
                {blog?.title}
                {" "}by{" "}
                <Link to={`/users/${blog?.user.id}`}>
                    {blog?.author}
                </Link>
            </h1>

            <a 
            href={ blog?.url } 
            target="_blank"
            rel="noreferrer">
                {blog?.url}
            </a>

            <div>
                {blog?.likes}

                <button
                onClick={likeaBlog}>
                    Like
                </button>
            </div>

            <p>
                Added by {blog?.user.name}
            </p>
            
            <h2>
                Comments
            </h2>

            <form onSubmit={commentSubmit}>
                <input 
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add comment"
                />

                <button
                type="submit">
                    Add
                </button>
            </form>
            {
                blog?.comments.map(comment => <li>
                    {comment}
                </li>)
            }
            
        </div>
    )
}

export default Blog
