import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './Component.css'

function Register({ registerProps }) {
    return (
        <div className="formContainer" >
            <h2>Register as a user</h2>
            
            <Form onSubmit={ registerProps.handleUserRegister }>

                <Form.Group>
                    <Form.Label>
                        Name
                    </Form.Label>

                    <Form.Control 
                        type="text"
                        value={ registerProps.name }
                        onChange={ (e) => registerProps.setName(e.target.value) }
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>
                        Username
                    </Form.Label>

                    <Form.Control 
                        type="text"
                        value={ registerProps.username }
                        onChange={ (e) => registerProps.setUsername(e.target.value) }
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>

                    <Form.Control 
                        type="text"
                        value={ registerProps.password }
                        onChange={ (e) => registerProps.setPassword(e.target.value) }
                    />
                </Form.Group>

                <Button 
                variant="primary" 
                type="submit" 
                disabled={ registerProps.username === "" 
                    || registerProps.password === "" } >
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register;