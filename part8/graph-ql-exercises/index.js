const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");

let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "The Demon ",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = gql`

    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!

        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
	Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,

        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return books;
            }
            else if (args.author && !args.genre) {
                return books.filter(book => book.author === args.author);
            }
            else if (!args.author && args.genre) {

                let results = [];

                books.forEach(book => {
                    for (let i = 0; i < book.genres.length; i++) {
                        if (book.genres[i] === args.genre) {
                            results.push(book);
                            break;
                        };
                    };
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
            }
            else {
                let results = [];

                books.forEach(book => {
                    if (book.author === args.author) {
                        for (let i = 0; i < book.genres.length; i++) {
                            if (book.genres[i] === args.genre) {
                                results.push(book);
                                break;
                            };
                        };
                    };
                });

                return results;
            }
        },

        allAuthors: () => authors
    },

    Mutation: {
        addBook: (root, args) => {
            if (!args.title || !args.author || 
                !args.published || !args.genres ||
                !args.genres.length === 0) {
                    throw new UserInputError("Missing fields for adding a new book, check input");
            }
            else {
                const authorExists = authors.some(author => author.name === args.author)

                if (!authorExists) {
                    const newAuthor = {
                        name: args.author,
                        born: null,
                        id: uuid()
                    };

                    authors.push(newAuthor);
                };

                const newBook = {
                    ...args,
                    id: uuid()
                };
                books.push(newBook);

                console.log(books);
                return newBook;
            }
        },

        editAuthor: (root, args) => {
            if (!args.name || !args.setBornTo) {
                throw new UserInputError("Missing fields to update author");
            };

            let updatedAuthor = null;
            authors = authors.map(author => {
                if (author.name === args.name) {
                    updatedAuthor = {
                        ...author,
                        born: args.setBornTo
                    };
                    return updatedAuthor
                } else return author;
            });
            return updatedAuthor;
        }
    },

    Author: {
        bookCount: root => {
            return books.filter(book => book.author === root.name).length
        }
    }
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
