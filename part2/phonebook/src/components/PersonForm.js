import React from 'react';
import LabelInput from './LabelInput';

function PersonForm({ onSubmit, newName, newNum, setNewName, setNewNum }) {
    return (
        <form onSubmit={ onSubmit }>
            <LabelInput inputLabel="Name" type="text" value={ newName } 
            onChange={(e) => setNewName(e.target.value)}
            />
            <LabelInput inputLabel="Number" type="text" value={ newNum } 
            onChange={(e) => setNewNum(e.target.value)} 
            />
            <button type="submit" disabled={ (newName === '') || (newNum === '') }>
                Add
            </button>
        </form>
    )
}

export default PersonForm
