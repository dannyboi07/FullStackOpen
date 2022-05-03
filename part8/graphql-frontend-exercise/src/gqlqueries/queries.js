import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		id
		genres
		author {
			name
		}
	}
`;

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`;

const ALL_BOOKS = gql`
	query allBooksQuery($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}

	${BOOK_DETAILS}
`;

const LOGIN = gql`
	mutation loginQuery($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

const ADD_BOOK = gql`
	mutation addBookQuery(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}

	${BOOK_DETAILS}
`;

const EDIT_AUTHOR = gql`
	mutation changeAuthorYear($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			bookCount
			id
		}
	}
`;

const GET_FAV_GENRE = gql`
	query getUserFavGenre {
		me {
			favGenre {
				favGenreVal
			}
		}
	}
`;

const GET_FAV_BOOKS = gql`
	query getRecommendedBooks {
		recommended {
			title
			published
			id
			author {
				name
			}
		}
	}
`;

const SET_FAV_GENRE = gql`
	mutation changeFavGenre($newFavGenre: String!) {
		setUserFavGenre(favGenre: $newFavGenre) {
			favGenreVal
		}
	}
`;

const BOOK_ADDED = gql`
	subscription subNewBook {
		bookAdded {
			...BookDetails
		}
	}

	${BOOK_DETAILS}
`;

export {
	ALL_AUTHORS,
	ALL_BOOKS,
	ADD_BOOK,
	EDIT_AUTHOR,
	LOGIN,
	GET_FAV_GENRE,
	GET_FAV_BOOKS,
	SET_FAV_GENRE,
    BOOK_ADDED
};
