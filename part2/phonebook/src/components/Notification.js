import React from 'react'

function Notification({ classN, message }) {
    if (message === null) {
        return null;
    }
    return (
        <div className={ classN }>
            { message }
        </div>
    )
}

export default Notification;