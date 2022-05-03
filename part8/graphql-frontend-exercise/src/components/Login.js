import React, { useState, useEffect, useContext } from "react";
import { UserDispatchContext, dispatchLogin } from "../context/UserContext";

import { useMutation } from "@apollo/client";
import { Button, Input, InputDiv, Label } from "./styledComponents/Form";
import { LOGIN } from "../gqlqueries/queries";
function Login() {
    const [loginDetails, setUserDetails] = useState({
        username: "",
        password: ""
    });
    const userDispatch = useContext(UserDispatchContext);
    const [ login, result ] = useMutation(LOGIN, {
        onError: error => console.log(error.graphQLErrors[0].message),
    });

    function handleChange(e) {
        setUserDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        login({ variables: { ...loginDetails } })
    };

    useEffect(() => {

        if (result.data) {
            console.log(result.data);
            const token = result.data.login.value;
            dispatchLogin(userDispatch, token);
            // localStorage.setItem("book-app-user-token", token);
        }
    }, [result.data]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputDiv>
                    <Label htmlFor="username">Username:</Label>
                    <Input 
                        id="username"
                        name="username"
                        type="text"
                        value={loginDetails.username}
                        onChange={handleChange}
                    />
                </InputDiv>

                <InputDiv>
                    <Label htmlFor="password">Password:</Label>
                    <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={loginDetails.password}
                        onChange={handleChange}
                    />
                </InputDiv>

                <Button type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;