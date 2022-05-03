import React from "react";

function BooksTableBody({ books }) {
	return (
		<tbody>
			{books.map((book) => (
				<tr key={book.id}>
					<td>{book.title}</td>
					<td>{book.author.name}</td>
					<td>{book.published}</td>
				</tr>
			))}
		</tbody>
	);
}

export default BooksTableBody;
