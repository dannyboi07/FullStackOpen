import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

test("renders todo", () => {
	const todo = {
		text: "Todo for test",
		done: false,
	};

	const done = (
		<>
			<span>This todo is not done</span>
			<span>
				<button>Delete</button>
				<button>Set as done</button>
			</span>
		</>
	);

	render(<Todo text={todo.text} done={done} />);

    const todoElement = screen.getByText("Todo for test");

    expect(todoElement).toBeDefined();
});
