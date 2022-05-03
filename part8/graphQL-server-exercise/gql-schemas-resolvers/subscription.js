const { gql } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const typeDef = gql`
	type Subscription {
		bookAdded: Book!
	}
`;

const resolver = {
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
		},
	},
};

module.exports = {
	subscriptionTypeDef: typeDef,
	subscriptionResolver: resolver,
    pubsub
};
