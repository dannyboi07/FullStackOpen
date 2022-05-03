import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../gqlqueries/queries";
import BookFilter from "./BookFilter";
import BooksTableBody from "./BooksTableBody";

function Books() {
	const [genres, setGenres] = useState([]);
	const [curGenre, setCurGenre] = useState("all");

	const result = useQuery(ALL_BOOKS, {
        variables: { genre: curGenre === "all" ? null : curGenre }
    });

	useEffect(() => {
        // Making sure genres are only set after the first req by checking genres length,
        // so that genres holds all the possible genres available on the server,
        // cause the useEffect is triggered by changes on result.data, and if genres is set
        // on every result.data change, rather than just the first time when all the books are displayed, 
        // genres will only hold those genres which are currently available
        // on the client side rather than all of those which are available on the server
		if (result.data && genres.length === 0) { 
			const tempGenreSet = new Set();              // Temporarily adding genres to a Set to guarantee unique genres
			result.data.allBooks.forEach(book => {
				book.genres.forEach((genre) => tempGenreSet.add(genre)); // Blindly adding genres, without checking pre-existance since we're adding to a Set
			});
			setGenres([...tempGenreSet, curGenre]);
		}
	}, [result.data]);

	if (result.loading) {
		return (
			<div>
				<h2>Books</h2>
				Loading...
			</div>
		);
	}

	function handleGenreChange(genre) {
		setCurGenre(genre);
	}

	return (
		<div>
			<h2>Books</h2>

			{result.data && (
				<>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Author</th>
								<th>Published</th>
							</tr>
						</thead>

                        <BooksTableBody 
                            books={result.data.allBooks}
                        />
					</table>

					{genres.length > 0 && (
						<BookFilter
							genres={genres}
							curGenre={curGenre}
							handleGenreChange={handleGenreChange}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default Books;
