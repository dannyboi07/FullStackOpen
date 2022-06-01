import "./App.css";
import TodoView from "./Todos/TodoView";

function App() {
	console.log(process.env.REACT_APP_BACKEND_URL);
	return (
		<div className="App">
			<TodoView />
		</div>
	);
}

export default App;
