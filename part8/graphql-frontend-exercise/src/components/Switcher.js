import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Switch, Route, Redirect } from "react-router-dom";
import Authors from "./Authors";
import Books from "./Books";
import AddBook from "./AddBook";
import Login from "./Login";
import RecBooks from "./RecBooks";

function Switcher() {
	const user = useContext(UserContext);

	return (
		<>
			<Switch>
				<Route path="/recommended">
					{user ? <RecBooks /> : <Redirect to="/login" />}
				</Route>

				<Route path="/addbook">
					{user ? <AddBook /> : <Redirect to="/login" />}
				</Route>

				<Route path="/authors">
					<Authors />
				</Route>

				<Route path="/books">
					<Books />
				</Route>

				<Route path="/login">
					{user ? <Redirect to="/authors" /> : <Login />}
				</Route>

				<Route path="/">
					<Redirect to="/authors" />
				</Route>
			</Switch>
		</>
	);
}

export default Switcher;
