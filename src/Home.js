import React, {useState} from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export var normalUserLogin; 

function Home() {
  

  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [LoginError, setLoginError]  = useState('');

  const navigate = useNavigate();

  const Login = () =>{
    Axios.post("https://crud-app02.herokuapp.com/login",{
      username: usernameLogin,
      password: passwordLogin,
    })
    .then(response => {
        if(response.data.message){
          setLoginError(response.data.message);
        }
        else if(response.data[0].username === "eduardtira"){
          navigate('/adminlogin');
        }
        else{
          navigate('/userlogin');
          normalUserLogin = response.data[0].username;
        }   
        console.log(response);
    });
    setUsernameLogin('');
    setPasswordLogin('');
    setLoginError('');
};

  return (
    <div className="App">
      <div className="Login">
        <h1>Login</h1>
        <input type = "text" placeholder = "Username..." onChange={(e) => {setUsernameLogin(e.target.value);}}/>
        <input type = "password" placeholder = "Password..." onChange={(e) => {setPasswordLogin(e.target.value);}}/>
        <button onClick={Login}>Login</button>
        <h1>{LoginError}</h1>
      </div>
    </div>
  );
}

export default Home;
