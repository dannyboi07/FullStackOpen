import React from "react";
import { Button, Form } from "react-bootstrap";

function Login({ loginProps }) {
    return (
        <div>
            <h2>Already registered?</h2>
            
            <Form onSubmit={loginProps.handleUserLogin}>

                <Form.Group>
                    <Form.Label>
                        Username:
                    </Form.Label>

                    <Form.Control 
                        type="text"
                        value={loginProps.username}
                        onChange={(e) => loginProps.setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Password:
                    </Form.Label>

                    <Form.Control 
                        type="password"
                        value={loginProps.password}
                        onChange={(e) => loginProps.setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    disabled={
                        loginProps.username === "" || loginProps.password === ""
                    }
                >
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
