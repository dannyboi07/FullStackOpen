import React from 'react'

function Notification({ errorMessage }) {
    return (
        <div className={`notif ${errorMessage.color}`}>
            <h3>{ errorMessage.message }</h3>           
        </div>
    )
}

export default Notification
