import React, { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../gqlqueries/queries";
import AuthorYearForm from "./AuthorYearForm";
import { UserContext } from "../context/UserContext";

function Authors() {
	const [curAuthor, setCurAuthor] = useState(null);
	const [authorYear, setAuthorYear] = useState(0);
	const user = useContext(UserContext);

	const result = useQuery(ALL_AUTHORS);
	const [changeAuthYear] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	useEffect(() => {
		if (result.data) {
			setCurAuthor(result.data.allAuthors[0].name);
			setAuthorYear(result.data.allAuthors[0].born);
		}
	}, [result.data]);

	function handleAuthorChange(author) {
		setCurAuthor(author);
		if (result.data) {
			result.data.allAuthors.forEach((a) =>
				a.name === author
					? a.born
						? setAuthorYear(a.born)
						: setAuthorYear(0)
					: null,
			);
		}
	}

	function handleAuthorYearChange(e) {
		setAuthorYear(e.target.value);
	}

	function handleAuthorYearSubmit(e) {
		e.preventDefault();

		changeAuthYear({
			variables: { name: curAuthor, setBornTo: parseInt(authorYear, 10) },
		});
	}

	if (result.loading) {
		return (
			<div>
				<h2>Authors</h2>
				Loading...
			</div>
		);
	}

	return (
		<div>
			<h2>Authors</h2>

			{result.data && (
				<table>
					<thead>
						<tr>
							<th>Name</th>

							<th>Born</th>

							<th>Books</th>
						</tr>
					</thead>

					<tbody>
						{result.data.allAuthors.map((author) => (
							<tr key={author.id}>
								<td>{author.name}</td>
								<td>{author.born}</td>
								<td>{author.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{user && curAuthor && (
				<AuthorYearForm
					authors={result.data.allAuthors}
					curAuthor={curAuthor}
					authorYear={authorYear}
					handleAuthorChange={handleAuthorChange}
					handleAuthorYearChange={handleAuthorYearChange}
					handleAuthorYearSubmit={handleAuthorYearSubmit}
				/>
			)}
		</div>
	);
}

export default Authors;
