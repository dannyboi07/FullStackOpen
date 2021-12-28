import React from 'react';
import Input from './Input';

function LabelInput( { inputLabel, type, value, onChange } ) {
    return (
        <div>
            { inputLabel } <Input type={ type } value={ value } onChange={ onChange } />
        </div>
    )
}

export default LabelInput;