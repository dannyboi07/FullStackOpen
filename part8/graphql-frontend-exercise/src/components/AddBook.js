import React, { useState } from "react";
// import { flushSync } from "react-dom";

import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../gqlqueries/queries";
import { InputDiv, Label, Input, Button } from "./styledComponents/Form";

function AddBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState(2022);
	const [genreValue, setGenreValue] = useState("");
	const [genres, setGenres] = useState([]);

	const [createBook] = useMutation(ADD_BOOK);

	function addGenre() {
		if (genreValue === "" && genreValue === " ") {
			return;
		}

        setGenres([ ...genres, genreValue ]);
        setGenreValue("");
	};

	function submitBook(e) {
		e.preventDefault();

		createBook({ variables: { title, author, published: parseInt(published, 10), genres } });

		setTitle("");
		setAuthor("");
		setPublished(2022);
		setGenres([]);
	}

	return (
		<div>
			<h2>Add a book</h2>
			<form 
            onSubmit={submitBook} 
            style={{ 
                border: "1px solid black" 
            }}>
				<InputDiv>
					<Label htmlFor="title">Title:</Label>
					<Input
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</InputDiv>

				<InputDiv>
					<Label htmlFor="author">Author:</Label>
					<Input
						id="author"
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</InputDiv>

				<InputDiv>
					<Label htmlFor="published">Published:</Label>
					<Input
						id="published"
						type="number"
						value={published}
						onChange={(e) => setPublished(e.target.value)}
					/>
				</InputDiv>

				<InputDiv>

                    <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Label htmlFor="genres">
                            Genres:
                        </Label>

                        {
                            genres.map((genre, i) => <p key={i}>{`${genre},`}</p>)
                        }
                    </div>

					<div
						style={{
							display: "flex",
						}}
					>
						<Input
							id="genres"
							type="text"
							value={genreValue}
							onChange={(e) => setGenreValue(e.target.value.toLowerCase())}
							css={{
								width: "85%",
							}}
						/>
						<Button
                        type="button"
							css={{
								margin: "0 auto",
							}}
							onClick={ addGenre }
						>
							Add Genre
						</Button>
					</div>
				</InputDiv>

                <Button
                type="submit"
                onClick={submitBook}>
                    Add
                </Button>
			</form>
		</div>
	);
}

export default AddBook;

// {
    // update: allBooksCacheUpdate()

    // update: (cache, response) => {
    //     // Making the all_books query in cache with the genre filter of each genre that the new book
    //     // has, if such a query's cache exists, update it
    //     response.data.addBook.genres.forEach(genre => {
    //         try {
    //             cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, booksCache => {
    //                 return {
    //                     allBooks: booksCache.allBooks.concat(response.data.addBook)
    //                 }
    //             })   
    //         } catch (err) {
    //             // console.error(err);
    //         }
    //     })
    //     // Also add the new book to the cache of all books, which is genre = null
    //     try {
    //         cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, (res) => {
    //             return {
    //                 allBooks: res.allBooks.concat(response.data.addBook)
    //             }
    //         })      
    //     } catch (err) {
    //         // console.error(err);
    //     }
    // },
// }