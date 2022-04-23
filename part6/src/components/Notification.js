import React from 'react';
import { connect } from 'react-redux';

function Notification(props) {
    // const notification = useSelector(state => state.notification);
    // console.log(notification);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };

    return (
        <div style={style}>
            { props.notification }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        notification: state.notification
    };
};

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification;