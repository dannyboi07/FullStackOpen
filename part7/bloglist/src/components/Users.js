import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsers } from "../services/userService";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res))
            .catch((err) => console.error(err));
    }, []);

    console.log(users);

    return (
        <div>
            <h1>Users & number of blogs</h1>

            <table
                style={{
                    margin: "0 auto",
                }}
            >
                <tbody>
                    {users &&
                        users.map((user) => (
                            <tr key={user.id}>
                            
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>

                                <td>{user.numBlogs}</td>

                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
