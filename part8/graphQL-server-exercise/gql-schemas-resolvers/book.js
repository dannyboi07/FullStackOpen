const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const { pubsub } = require("./subscription");
const Book = require("../models/Book");
const Author = require("../models/Author");

const typeDef = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Query {
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!

		recommended: [Book!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
	}
`;

const resolver = {
	Query: {
		bookCount: async () => await Book.find({}).countDocuments(),

		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return await Book.find({}).populate("author");
			} else if (args.author && !args.genre) {
				const author = await Author.findOne({ name: args.author }).populate("bookCount");
				if (!author) return [];

				const res = await Book.find({ author: author._id }).populate(
					"author",
				);
				return res;
				// return books.filter((book) => book.author === args.author);
			} else if (!args.author && args.genre) {
				return await Book.find({ genres: args.genre }).populate(
					"author",
				);
				let results = [];

				books.forEach((book) => {
					for (let i = 0; i < book.genres.length; i++) {
						if (book.genres[i] === args.genre) {
							results.push(book);
							break;
						}
					}
				});

				return results;
				// const res = books.map(book => {
				//     const resEach = book.genres.forEach(genre => {
				//         if (genre === args.genre) {
				//             // console.log(book);
				//             return book;
				//         };
				//     })
				//     console.log(resEach);
				//     return resEach;
				// });
				// console.log(1, res, 1);

				// return res;
			} else {
				const author = await Author.findOne({ name: args.author }).populate("bookCount");
				if (!author) return [];

				const res = await Book.find({
					$and: [{ author: author._id }, { genres: args.genre }],
				}).populate("author");
				return res;
				let results = [];

				books.forEach((book) => {
					if (book.author === args.author) {
						for (let i = 0; i < book.genres.length; i++) {
							if (book.genres[i] === args.genre) {
								results.push(book);
								break;
							}
						}
					}
				});

				return results;
			}
		},

		recommended: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("Not authenticated");
			}

			try {
				if (currentUser.favGenre === "none") {
					return await Book.find({}).populate("author");
				}

				return await Book.find({
					genres: currentUser.favGenre,
				}).populate("author");
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
		},
	},

	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			try {
				if (!currentUser) {
					throw new AuthenticationError("Not authenticated");
				} else if (
					!args.title ||
					!args.author ||
					!args.published ||
					!args.genres ||
					!args.genres.length === 0
				) {
					throw new UserInputError(
						"Missing fields for adding a new book, check input",
					);
				} else {
					// const authorExists = authors.some(
					// 	(author) => author.name === args.author,
					// );

					// if (!authorExists) {
					// 	const newAuthor = {
					// 		name: args.author,
					// 		born: null,
					// 		id: uuid(),
					// 	};

					// 	authors.push(newAuthor);
					// }
					try {
						const authorExists = await Author.findOne({
							name: args.author,
						});

						let book = null;

						if (!authorExists) {
							const author = new Author({ name: args.author });
							await author.save();

							book = new Book({
								...args,
								author: author._id,
							});
						} else {
							book = new Book({
								...args,
								author: authorExists._id,
							});
						}
						// .catch(err => {
						//     throw new UserInputError(err.message, {
						//         invalidArgs: args
						//     })
						// });
						await book.save().then(async (book) => await book.populate("author"));

                        console.log("after",book);
                        pubsub.publish("BOOK_ADDED", { bookAdded: book });
                        return book;
					} catch (err) {
						throw new UserInputError(err.message, {
							invalidArgs: args,
						});
					}
					// const newBook = {
					// 	...args,
					// 	id: uuid(),
					// };
					// books.push(newBook);

					// return newBook;
				}
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
		},
	},
};

module.exports = {
	bookDef: typeDef,
	bookResolver: resolver,
};
