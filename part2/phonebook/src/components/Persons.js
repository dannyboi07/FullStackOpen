import React from 'react';

function Persons({ PersonName, PersonNum, remove }) {
    return (
        <div>
            { PersonName } { PersonNum }
            <button onClick={remove}>Delete</button>
        </div>
    )
}

export default Persons;