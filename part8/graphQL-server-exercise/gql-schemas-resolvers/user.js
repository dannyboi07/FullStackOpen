const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../models/User");

const typeDef = gql`
	type User {
		username: String!
		favGenre: FavGenre!
		id: ID!
	}

	type FavGenre {
		favGenreVal: String!
	}

	type Token {
		value: String!
	}

	type Query {
		me: User!
	}

	type Mutation {
		createUser(username: String!, favoriteGenre: String!): User

		login(username: String!, password: String!): Token

		setUserFavGenre(favGenre: String!): FavGenre
	}
`;

const resolver = {
	Query: {
		me: (root, args, context) => context.currentUser,
	},

	Mutation: {
		createUser: async (root, args) => {
			const user = new User({ ...args, favGenre: "none" });

			return user.save().catch((err) => {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new UserInputError("Wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},

		setUserFavGenre: async (root, args, { currentUser }) => {
			if (!currentUser) {
				return new AuthenticationError("Not Authenticated");
			} else if (!args.favGenre) {
				return new UserInputError("Favorite genre missing");
			}

			try {
				const user = await User.findOneAndUpdate(
					{ username: currentUser.username },
					{ favGenre: args.favGenre },
				);

				return {
					favGenre: user.favGenre,
				};
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				});
			}
		},
	},

	FavGenre: {
		favGenreVal: async (root, args, { currentUser }) => {
			return (await User.findOne({ username: currentUser.username }))
				.favGenre;
		},
	},
};

module.exports = {
	userDef: typeDef,
	userResolver: resolver,
};
