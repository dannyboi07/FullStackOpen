import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	GET_FAV_GENRE,
	GET_FAV_BOOKS,
	SET_FAV_GENRE,
} from "../gqlqueries/queries";
import { Button, Input, Label } from "./styledComponents/Form";
import BooksTableBody from "./BooksTableBody";

function RecBooks() {
	const [favGenreInput, setFavGenreInput] = useState("");

	const favGenreResult = useQuery(GET_FAV_GENRE);
	const favBooksResult = useQuery(GET_FAV_BOOKS);

	const [changeGenre] = useMutation(SET_FAV_GENRE, {
		onError: (error) => console.log(error.graphQLErrors[0].message),
		refetchQueries: [{ query: GET_FAV_GENRE }, { query: GET_FAV_BOOKS }],
	});

	function handleGenreChangeSubmit(e) {
		e.preventDefault();

		changeGenre({ variables: { newFavGenre: favGenreInput } });
	}

	if (favBooksResult.loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>
				Showing recommendations based on your favorite genre:{" "}
				<span
					style={{
						textTransform: "capitalize",
					}}
				>
					{favGenreResult.data.me.favGenre.favGenreVal}
				</span>
			</h2>

			<p>
				Change your favorite genre: (Type in "None" or "none" if not
				any)
			</p>
			<form onSubmit={handleGenreChangeSubmit}>
				<Label htmlFor="genre">Genre:</Label>

				<Input
					id="genre"
					type="text"
					value={favGenreInput}
					onChange={(e) =>
						setFavGenreInput(e.target.value.toLowerCase())
					}
				/>

				<Button css={{ marginLeft: "1em" }} type="submit">
					Change
				</Button>
			</form>

			<hr />

			{favBooksResult && (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Author</th>
							<th>Published</th>
						</tr>
					</thead>

					<BooksTableBody books={favBooksResult.data.recommended} />
				</table>
			)}
		</div>
	);
}

export default RecBooks;
