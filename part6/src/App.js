import React, { useEffect } from 'react';
import './App.css';
import NewAnec from './components/NewAnec';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Anecdotes</h1>
      <NewAnec />
      <Filter />
      <Notification />
      <Anecdotes />
    </div>
  );
}

export default App;