import React from "react";

function Todo({ text, done }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				maxWidth: "70%",
				margin: "auto",
			}}
		>
			<span>{text}</span>
			{done}
		</div>
	);
}

export default Todo;
