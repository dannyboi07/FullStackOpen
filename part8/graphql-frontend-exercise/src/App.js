import React, { useReducer } from "react";
import { UserContext, UserDispatchContext, userReducer } from "./context/UserContext";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./gqlqueries/queries";
import Navbar from "./components/Navbar";
import Switcher from "./components/Switcher";
import "./App.css";

export function allBooksCacheUpdate(cache, addedBook) {
    // Making the all_books query in cache with the genre filter of each genre that the new book
    // has, if such a query's cache exists, update it
    addedBook.genres.forEach(genre => {
        try {
            cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, booksCache => {
                return {
                    allBooks: booksCache.allBooks.concat(addedBook)
                }
            })   
        } catch (err) {
            // console.error(err);
        }
    })
    // Also add the new book to the cache of all books, which is genre = null
    try {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, (res) => {
            return {
                allBooks: res.allBooks.concat(addedBook)
            }
        })      
    } catch (err) {
        // console.error(err);
    }
}

function App() {
	const userToken = localStorage.getItem("book-app-user-token");
	const [user, dispatch] = useReducer(userReducer, userToken);
    const client = useApolloClient();

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            allBooksCacheUpdate(client.cache, subscriptionData.data.bookAdded)
        }
    })

	return (
		<div className="apppp">
			<UserContext.Provider value={user}>
				<UserDispatchContext.Provider value={dispatch}>
					<Navbar />

					<Switcher />
				</UserDispatchContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;
