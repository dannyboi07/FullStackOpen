import React, { useState } from 'react';
import './App.css';

const SectionHeader = ( { text } ) => {
  return (
    <h1>{ text }</h1>
  );
}

const VoteDisplay = ( { votes, selected } ) => {
  return (
    <p>Has { votes[selected] } votes</p>
  );
}

const ReturnAnecdote = ( { anecdotes, selected, maxVoteDisplay, votes } ) => {

  if ( maxVoteDisplay === true ) {
    let maxVoteAnec = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    return(
      <>
        <p>{ anecdotes[maxVoteAnec] }</p>
        <VoteDisplay votes={ votes } selected={ maxVoteAnec } />
      </>
    );
  }
  return (
    <p>{ anecdotes[selected] }</p>
  );
}

const VoteAndSwitchButton = ( { onClick, text } ) => {

  return (
    <button onClick={ onClick } >{ text }</button>
  );
}

function App() {

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it safer",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  const [selected, setSelected] = useState(0);

  const handleVoteClick = () => {
    for (let i = 0; i <= 6; i++) {
      if ( i === selected ) {
        setVotes({ [votes[i]]: votes[i] += 1, ...votes });
        console.log(votes)
        break;
      }
    }
  }

  const handleNextAnecClk = () => {
    let anecNum = selected
    while ( anecNum === selected) {
      anecNum = Math.floor(Math.random() * 7);
      if (anecNum !== selected) {
        setSelected(anecNum);
        break;
      }
    }
  }

  return (
    <div className="App">
      <SectionHeader text="Anecdote of the day" />
      <ReturnAnecdote anecdotes={ anecdotes } selected={ selected } maxVoteDisplay={ false } />
      <VoteDisplay votes={ votes } selected={ selected } />
      <VoteAndSwitchButton text="Vote" onClick={ handleVoteClick } />
      <VoteAndSwitchButton text="Next Anecdote" onClick={ handleNextAnecClk } />

      <SectionHeader text="Anecdote with the Most Votes" />
      <ReturnAnecdote anecdotes={ anecdotes } selected={ selected } votes={ votes } maxVoteDisplay={ true } />
    </div>
  );
}

export default App;
