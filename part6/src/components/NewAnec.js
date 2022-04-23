import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatNewAnec } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function NewAnec() {
    const [newAnec, setNewAnec] = useState("");
    const dispatch = useDispatch();
    
    function handleNoteInputChange(e) {
        setNewAnec(e.target.value);
    };

    function handleAnecSubmit(e) {
        e.preventDefault();

        dispatch(formatNewAnec(newAnec));

        // dispatch({ 
        //     type: "ADD", 
        //     data: { content: newAnec } 
        // });

        dispatch(setNotification("SHOW_NOTIF", `You added ${newAnec}`, 2));
    };

    return (
        <form onSubmit={(e) => handleAnecSubmit(e)}>
            <input name="anecdote" onChange={(e) => handleNoteInputChange(e)}/>
            <button type="submit" disabled={ !newAnec }>Add</button>
        </form>
    );
}

export default NewAnec;
