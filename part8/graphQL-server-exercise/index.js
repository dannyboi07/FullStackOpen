const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const http = require("http");
const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

const { authorDef, authorResolver } = require("./gql-schemas-resolvers/author");
const { bookDef, bookResolver } = require("./gql-schemas-resolvers/book");
const { userDef, userResolver } = require("./gql-schemas-resolvers/user");
const { subscriptionTypeDef, subscriptionResolver } = require("./gql-schemas-resolvers/subscription");
const merge = require("lodash.merge");

const jwt = require("jsonwebtoken");

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB Atlas", err.message);
	});
mongoose.set("debug", true);

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

async function start() {
	const app = express();
	const httpServer = http.createServer(app);

	const schema = makeExecutableSchema({
		typeDefs: [authorDef, bookDef, userDef, subscriptionTypeDef],
		resolvers: merge(authorResolver, bookResolver, userResolver, subscriptionResolver),
	});

	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
		},
		{
			server: httpServer,
			path: "",
		},
	);

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null;
            if (auth && auth.toLowerCase().startsWith("bearer ")) {
                const decodedToken = jwt.verify(
                    auth.substring(7),
                    process.env.JWT_SECRET,
                );
    
                const currentUser = await User.findById(decodedToken.id);
                return { currentUser };
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ]
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: "/"
    });

    httpServer.listen(process.env.PORT || 4000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);
    })
}

start();

// server.listen({ port: 4000 }).then(({ url }) => {
// 	console.log(`Server ready at ${url}`);
// });

// let authors = [
// 	{
// 		name: "Robert Martin",
// 		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
// 		born: 1952,
// 	},
// 	{
// 		name: "Martin Fowler",
// 		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
// 		born: 1963,
// 	},
// 	{
// 		name: "Fyodor Dostoevsky",
// 		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
// 		born: 1821,
// 	},
// 	{
// 		name: "Joshua Kerievsky", // birthyear not known
// 		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
// 	},
// 	{
// 		name: "Sandi Metz", // birthyear not known
// 		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
// 	},
// ];
// let books = [
// 	{
// 		title: "Clean Code",
// 		published: 2008,
// 		author: "Robert Martin",
// 		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring"],
// 	},
// 	{
// 		title: "Agile software development",
// 		published: 2002,
// 		author: "Robert Martin",
// 		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
// 		genres: ["agile", "patterns", "design"],
// 	},
// 	{
// 		title: "Refactoring, edition 2",
// 		published: 2018,
// 		author: "Martin Fowler",
// 		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring"],
// 	},
// 	{
// 		title: "Refactoring to patterns",
// 		published: 2008,
// 		author: "Joshua Kerievsky",
// 		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring", "patterns"],
// 	},
// 	{
// 		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
// 		published: 2012,
// 		author: "Sandi Metz",
// 		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring", "design"],
// 	},
// 	{
// 		title: "Crime and punishment",
// 		published: 1866,
// 		author: "Fyodor Dostoevsky",
// 		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
// 		genres: ["classic", "crime"],
// 	},
// 	{
// 		title: "The Demon ",
// 		published: 1872,
// 		author: "Fyodor Dostoevsky",
// 		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
// 		genres: ["classic", "revolution"],
// 	},
// ];
// const typeDefs = gql`
// 	// type FavGenre {
// 		favGenreVal: String!
// 	}
// 	// type User {
// 		username: String!
// 		favGenre: FavGenre!
// 		id: ID!
// 	}

// 	// type Token {
// 		value: String!
// 	}

// 	// type Author {
// 		name: String!
// 		born: Int
// 		bookCount: Int
// 		id: ID! 
// 	}

// 	// type Book {
// 		title: String!
// 		published: Int!
// 		author: Author!
// 		genres: [String!]!
// 		id: ID!
// 	}

// 	type Query {
// 		// bookCount: Int!
// 		// authorCount: Int!

// 		// allBooks(author: String, genre: String): [Book!]!
// 		// allAuthors: [Author!]!

//         // recommended: [Book!]!  

// 		// me: User!
// 	}

// 	type Mutation {
// 		// addBook(
// 			title: String!
// 			author: String!
// 			published: Int!
// 			genres: [String!]!
// 		): Book

// 		// editAuthor(name: String!, setBornTo: Int!): Author

// 		createUser(username: String!, favoriteGenre: String!): User

// 		login(username: String!, password: String!): Token

// 		setUserFavGenre(favGenre: String!): FavGenre
// 	}
// `;

// const resolvers = {
// 	Query: {
// 		bookCount: async () => await Book.find({}).countDocuments(), //
// 		authorCount: async () => await Author.find({}).countDocuments(), //

// 		allBooks: async (root, args) => {
// 			if (!args.author && !args.genre) {
// 				return await Book.find({}).populate("author");
// 			} else if (args.author && !args.genre) {
// 				const author = await Author.findOne({ name: args.author });
// 				if (!author) return [];

// 				const res = await Book.find({ author: author._id }).populate(
// 					"author",
// 				);
// 				return res;
// 				// return books.filter((book) => book.author === args.author);
// 			} else if (!args.author && args.genre) {
// 				return await Book.find({ genres: args.genre }).populate(
// 					"author",
// 				);
// 				let results = [];

// 				books.forEach((book) => {
// 					for (let i = 0; i < book.genres.length; i++) {
// 						if (book.genres[i] === args.genre) {
// 							results.push(book);
// 							break;
// 						}
// 					}
// 				});

// 				return results;
// 				// const res = books.map(book => {
// 				//     const resEach = book.genres.forEach(genre => {
// 				//         if (genre === args.genre) {
// 				//             // console.log(book);
// 				//             return book;
// 				//         };
// 				//     })
// 				//     console.log(resEach);
// 				//     return resEach;
// 				// });
// 				// console.log(1, res, 1);

// 				// return res;
// 			} else {
// 				const author = await Author.findOne({ name: args.author });
// 				if (!author) return [];

// 				const res = await Book.find({
// 					$and: [{ author: author._id }, { genres: args.genre }],
// 				}).populate("author");
// 				return res;
// 				let results = [];

// 				books.forEach((book) => {
// 					if (book.author === args.author) {
// 						for (let i = 0; i < book.genres.length; i++) {
// 							if (book.genres[i] === args.genre) {
// 								results.push(book);
// 								break;
// 							}
// 						}
// 					}
// 				});

// 				return results;
// 			}
// 		}, //

// 		allAuthors: async () => await Author.find({}), //

// 		recommended: async (root, args, { currentUser }) => {
// 			if (!currentUser) {
// 				throw new AuthenticationError("Not authenticated");
// 			}

// 			try {
// 				if (currentUser.favGenre === "none") {
// 					return await Book.find({}).populate("author");
// 				}

// 				return await Book.find({
// 					genres: currentUser.favGenre,
// 				}).populate("author");
// 			} catch (err) {
// 				throw new UserInputError(err.message, {
// 					invalidArgs: args,
// 				});
// 			}
// 		}, //

// 		me: (root, args, context) => context.currentUser, //
// 	},

// 	Mutation: {
// 		addBook: async (root, args, { currentUser }) => {
// 			try {
// 				if (!currentUser) {
// 					throw new AuthenticationError("Not authenticated");
// 				} else if (
// 					!args.title ||
// 					!args.author ||
// 					!args.published ||
// 					!args.genres ||
// 					!args.genres.length === 0
// 				) {
// 					throw new UserInputError(
// 						"Missing fields for adding a new book, check input",
// 					);
// 				} else {
// 					// const authorExists = authors.some(
// 					// 	(author) => author.name === args.author,
// 					// );

// 					// if (!authorExists) {
// 					// 	const newAuthor = {
// 					// 		name: args.author,
// 					// 		born: null,
// 					// 		id: uuid(),
// 					// 	};

// 					// 	authors.push(newAuthor);
// 					// }
// 					try {
// 						const authorExists = await Author.findOne({
// 							name: args.author,
// 						});

// 						if (!authorExists) {
// 							const author = new Author({ name: args.author });
// 							await author.save();

// 							const book = new Book({
// 								...args,
// 								author: author._id,
// 							});
// 							return book
// 								.save()
// 								.then((book) => book.populate("author"));
// 						}

// 						const book = new Book({
// 							...args,
// 							author: authorExists._id,
// 						});
// 						// .catch(err => {
// 						//     throw new UserInputError(err.message, {
// 						//         invalidArgs: args
// 						//     })
// 						// });
// 						return book
// 							.save()
// 							.then((book) => book.populate("author"));
// 					} catch (err) {
// 						throw new UserInputError(err.message, {
// 							invalidArgs: args,
// 						});
// 					}
// 					// const newBook = {
// 					// 	...args,
// 					// 	id: uuid(),
// 					// };
// 					// books.push(newBook);

// 					// return newBook;
// 				}
// 			} catch (err) {
// 				throw new UserInputError(err.message, {
// 					invalidArgs: args,
// 				});
// 			}
// 		}, //

// 		editAuthor: async (root, args, { currentUser }) => {
// 			if (!currentUser) {
// 				throw new AuthenticationError("Not authenticated");
// 			} else if (!args.name || !args.setBornTo) {
// 				throw new UserInputError("Missing fields to update author");
// 			}

// 			try {
// 				const updatedAuthor = await Author.findOneAndUpdate(
// 					{ name: args.name },
// 					{ born: args.setBornTo },
// 				);
// 				return updatedAuthor;
// 			} catch (err) {
// 				throw new UserInputError(err.message, {
// 					invalidArgs: args,
// 				});
// 			}
// 			// authors = authors.map((author) => {
// 			// 	if (author.name === args.name) {
// 			// 		updatedAuthor = {
// 			// 			...author,
// 			// 			born: args.setBornTo,
// 			// 		};
// 			// 		return updatedAuthor;
// 			// 	} else return author;
// 			// });
// 			// return updatedAuthor;
// 		}, //

// 		createUser: async (root, args) => {
// 			const user = new User({ ...args, favGenre: "none" });

// 			return user.save().catch((err) => {
// 				throw new UserInputError(err.message, {
// 					invalidArgs: args,
// 				});
// 			});
// 		}, //

// 		login: async (root, args) => {
// 			const user = await User.findOne({ username: args.username });

// 			if (!user || args.password !== "secret") {
// 				throw new UserInputError("Wrong credentials");
// 			}

// 			const userForToken = {
// 				username: user.username,
// 				id: user._id,
// 			};

// 			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
// 		}, //

// 		setUserFavGenre: async (root, args, { currentUser }) => {
// 			if (!currentUser) {
// 				return new AuthenticationError("Not Authenticated");
// 			} else if (!args.favGenre) {
// 				return new UserInputError("Favorite genre missing");
// 			}

// 			try {
// 				const user = await User.findOneAndUpdate(
// 					{ username: currentUser.username },
// 					{ favGenre: args.favGenre },
// 				);

// 				return {
// 					favGenre: user.favGenre,
// 				};
// 			} catch (err) {
// 				throw new UserInputError(err.message, {
// 					invalidArgs: args,
// 				});
// 			}
// 		}, //
// 	},

// 	Author: {
// 		bookCount: async (root) => {
// 			return await Book.find({ author: root._id }).countDocuments();
// 		},
// 	}, //

// 	FavGenre: {
// 		favGenreVal: async (root, args, { currentUser }) => {
// 			return (await User.findOne({ username: currentUser.username }))
// 				.favGenre;
// 		},
// 	}, //
// };
