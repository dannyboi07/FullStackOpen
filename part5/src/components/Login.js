import React from 'react'

function Login({ loginProps }) {
    return (
        <div>
            <h2>Already registered?</h2>
            <form className="formbox" onSubmit={ loginProps.handleUserLogin }>

                Username <input id="loginUsername" type="text" value={ loginProps.username }
                onChange={ (e) => loginProps.setUsername(e.target.value) } />

                Password <input id="loginPassword" type="password" value={ loginProps.password }
                onChange={ (e) => loginProps.setPassword(e.target.value) } />

                <button id="loginButton" type="submit" disabled={ loginProps.username === "" 
                    || loginProps.password === "" } >Login</button>
            </form>
        </div>
    );
};

export default Login
