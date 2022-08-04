import React from "react";
import { normalUserLogin } from "./Home";
import { useNavigate } from "react-router-dom";

function LoginUser(){

    const navigate = useNavigate();   
    const logOut = () => {
        navigate('/');
        console.clear();
    }

    return(
        <div>
            <h1>{normalUserLogin}, welcome to the site!</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}

export default LoginUser;