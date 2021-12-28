import React from 'react';

function ShowDetails(props) {

    return (
        <button onClick={ props.onClick }>
            { props.text }
        </button>
    )
}

export default ShowDetails;