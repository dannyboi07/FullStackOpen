import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
	const onClickDelete = (todo) => () => {
		deleteTodo(todo);
	};

	const onClickComplete = (todo) => () => {
		completeTodo(todo);
	};
	return (
		<>
			{todos
				.map((todo, i) => {
					const doneInfo = (
						<>
							<span>This todo is done</span>
							<span>
								<button onClick={onClickDelete(todo)}>
									{" "}
									Delete{" "}
								</button>
							</span>
						</>
					);

					const notDoneInfo = (
						<>
							<span>This todo is not done</span>
							<span>
								<button onClick={onClickDelete(todo)}>
									{" "}
									Delete{" "}
								</button>
								<button onClick={onClickComplete(todo)}>
									{" "}
									Set as done{" "}
								</button>
							</span>
						</>
					);

					return (
                        <Todo 
                        key={i}
                        text={todo.text}
                        done={ todo.done ? doneInfo : notDoneInfo }/>
					);
				})
				.reduce((acc, cur) => [...acc, <hr />, cur], [])}
		</>
	);
};

export default TodoList;

// <div
// 	style={{
// 		display: "flex",
// 		justifyContent: "space-between",
// 		maxWidth: "70%",
// 		margin: "auto",
// 	}}
// >
// 	<span>{todo.text}</span>
// 	{todo.done ? doneInfo : notDoneInfo}
// </div>