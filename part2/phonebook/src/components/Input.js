import React from 'react';

function Input( { type, value, onChange } ) {
    return (
        <input type={ type } value={ value } onChange={ onChange } ></input>
    )
}

export default Input
