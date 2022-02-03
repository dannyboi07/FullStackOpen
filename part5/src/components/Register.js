import React from 'react';
import './Component.css'

function Register({ registerProps }) {
    return (
        <div className="formContainer" >
            <h2>Register as a user</h2>
            <form className="formbox" onSubmit={ registerProps.handleUserRegister }>

                Name <input id="registerName" type="text" value={ registerProps.name } 
                onChange={ (e) => registerProps.setName(e.target.value) } />

                Username <input id="registerUsername" type="text" value={ registerProps.username } 
                onChange={ (e) => registerProps.setUsername(e.target.value) } />

                Password <input id="registerPassword" type="password" value={ registerProps.password }
                onChange={ (e) => registerProps.setPassword(e.target.value) } />

                <button id="registerButton" type="submit" disabled={ registerProps.username === "" 
                    || registerProps.password === "" } >Register</button>
            </form>
        </div>
    )
}

export default Register;