import React from 'react';
import Register from './Register';
import Login from './Login';
import '../App.css';
import Notification from './Notification';

function Homepage(props) {
    // console.log("from homepage:", props.errorMessage);
    // if (props.errorMessage !== null) {
    //     console.log(props.errorMessage.message);
    //     console.log(Object.getPrototypeOf(props.errorMessage));
    // }
    return (
        <>
            { props.errorMessage && <Notification errorMessage={ props.errorMessage } /> }
            <div className="homepage">
                <Register className="formbox" registerProps={ props.registerProps } />
                <Login loginProps={ props.loginProps } />
            </div>
        </>
    );
};

export default Homepage;
