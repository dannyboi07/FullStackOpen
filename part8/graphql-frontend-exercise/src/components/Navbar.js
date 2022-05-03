import React, { useContext } from "react";
import { UserContext, UserDispatchContext, dispatchLogout } from "../context/UserContext";
import { Link } from "react-router-dom";
import {
	NavMenu,
	NavMenuList,
	NavMenuItem,
} from "./styledComponents/Navigation";
// import { Button } from "./styledComponents/Form";

function Navbar() {
	const user = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);

    function logout() {
        dispatchLogout(userDispatch);
    };

	return (
		<NavMenu>
			<NavMenuList>
				<NavMenuItem>
					<Link to="/authors">Authors</Link>
				</NavMenuItem>

				<NavMenuItem>
					<Link to="/books">Books</Link>
				</NavMenuItem>

				{user ? (
                    <>
                        <NavMenuItem>
                            <Link to="/addbook">Add a book</Link>
                        </NavMenuItem>

                        <NavMenuItem>
                            <Link to="/recommended">
                                Recommended
                            </Link>
                        </NavMenuItem>

                        <NavMenuItem>
                            <p
                            onClick={logout}>
                                Logout
                            </p>
                        </NavMenuItem>
                    </>
				) : (
					<NavMenuItem>
                        <Link to="/login">
                            Login
                        </Link>
                    </NavMenuItem>
				)}
			</NavMenuList>
		</NavMenu>
	);
}

export default Navbar;
