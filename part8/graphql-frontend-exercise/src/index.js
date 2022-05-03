import React from "react";
import ReactDOM from "react-dom";

import {
	ApolloProvider,
	ApolloClient,
	HttpLink,
	InMemoryCache,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("book-app-user-token");

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : null,
		},
	};
});

const wsLink = new WebSocketLink({
	uri: "ws://localhost:4000",
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(new HttpLink({ uri: "http://localhost:4000" })),
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
