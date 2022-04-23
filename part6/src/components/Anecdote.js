import React from 'react';

function Anecdote({ content, votes, handleVoteSubmit }) {
    return (
        <li style={{ marginBottom: "0.5em" }}>
            { content }<br />
            { votes }
            <button onClick={ handleVoteSubmit }>Vote</button>
        </li>
    );
}

export default Anecdote;
