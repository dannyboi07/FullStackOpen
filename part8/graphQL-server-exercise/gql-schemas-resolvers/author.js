const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const Author = require("../models/Author");
const Book = require("../models/Book");

const typeDef = gql`
	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}

	type Query {
		authorCount: Int!
		allAuthors: [Author!]!
	}

	type Mutation {
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolver = {
	Query: {
		authorCount: async () => await Author.find({}).countDocuments(),
		allAuthors: async () => await Author.find({}).populate("bookCount"),
    },
	Mutation: {
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("Not authenticated");
			} else if (!args.name || !args.setBornTo) {
				throw new UserInputError("Missing fields to update author");
			}

			try {
				const updatedAuthor = await Author.findOneAndUpdate(
					{ name: args.name },
					{ born: args.setBornTo },
				).populate("bookCount");
				return updatedAuthor;
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
			// authors = authors.map((author) => {
			// 	if (author.name === args.name) {
			// 		updatedAuthor = {
			// 			...author,
			// 			born: args.setBornTo,
			// 		};
			// 		return updatedAuthor;
			// 	} else return author;
			// });
			// return updatedAuthor;
		},
	},

	// Author: {
	// 	bookCount: async (root) => {
	// 		return await Book.find({ author: root._id }).countDocuments();
	// 	},
	// },
};

module.exports = {
	authorDef: typeDef,
	authorResolver: resolver,
};
