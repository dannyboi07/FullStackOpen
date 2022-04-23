import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser } from "../services/userService";

function User() {
    const params = useParams();

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        
        if (params.id) {
            getUser(params.id)
                .then(res => setUserDetails(res))
                .catch(err => console.error(err));
        };
    }, []);
    
    return (
        <div>
            <h1>
                {userDetails?.name}
            </h1>

            <h2>
                added blogs
            </h2>

            <ul
            style={{
                width: "fit-content",
                margin: "0 auto"
            }}>
                {
                    userDetails?.blogs.map(blog => <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>)
                }
            </ul>

        </div>
    )
}

export default User;