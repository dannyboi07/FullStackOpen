import React from 'react';
import { connect } from "react-redux";
import Anecdote from './Anecdote';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function Anecdotes(props) {
    // const dispatch = useDispatch();

    // let anecdotes = useSelector(state => state.anecdote.sort((anec1, anec2) => anec2.votes - anec1.votes));
    // const filter = useSelector(state => state.filter);
    let thisAnecdotes = props.anecdotes
    if (props.filter !== "") {
        thisAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()));
    }

    function handleVoteSubmit(id, content, votes) {

        props.vote(id, votes + 1);
        props.setNotification("SHOW_NOTIF", `You voted for ${content}`, 2);
    };

    return (
        <ul style={{ listStyle: "none" }}>
            { thisAnecdotes.map(anecdote => 
                <Anecdote key={anecdote.id} 
                content={ anecdote.content }
                votes = { anecdote.votes }
                handleVoteSubmit={ () => handleVoteSubmit(anecdote.id, anecdote.content, anecdote.votes) }
                />) 
            }
        </ul>
    );
};

function mapStateToProps(state) {
    return {
        anecdotes: state.anecdote.sort((anec1, anec2) => anec2.votes - anec1.votes),
        filter: state.filter
    };
};

const mapStateToDispatch = {
    vote,
    setNotification
};

const ConnectedAnecdote = connect(mapStateToProps, mapStateToDispatch)(Anecdotes);

export default ConnectedAnecdote;
