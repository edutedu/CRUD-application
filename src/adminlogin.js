import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function LoginAdmin(){
     
    const navigate = useNavigate();
  
    const [usernameAdd, setUsernameAdd] = useState('');
    const [passwordAdd, setPasswordAdd] = useState('');
    const [AddStatus, setAddStatus] = useState('');
    const [UserList, setUserList] = useState([]);
    const [newUsername, setnewUsername] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const logOut = () => {
        navigate('/');
        console.clear();
    }


    useEffect(() => {
        Axios.get("https://crud-app02.herokuapp.com/getusers")
        .then(response => {
              setUserList(response.data);
        });
    }, [])



    const addUser = () =>{  

      if(usernameAdd === '' || passwordAdd === ''){
        setAddStatus("Please enter the username/password!");
      }
      else if(passwordAdd.length < 10){
        setAddStatus("The password must contain at least 10 characters");
      }
      else{
        Axios.post("https://crud-app02.herokuapp.com/add", {
          username: usernameAdd, 
          password: passwordAdd,
        })
        .then(response => {
            if(response.data.message === "username taken"){
              setAddStatus("The username is already taken, please try another one!")
            }
            else if(response.data.message === "user added"){
              setUserList([
                ...UserList, 
                {username: usernameAdd, password: passwordAdd},
              ]);
            }
            console.log(response);
        });
    };
  };
    
    const deleteUser = (id) =>{
      Axios.delete(`https://crud-app02.herokuapp.com/delete/${id}`)
      .then((response)=>{
        setUserList([...UserList].filter((val)=>{
          return val.id !== id;
        }));
      });
    }

    const updateUser = (id) => {
      if(newUsername === ''){
        setAddStatus("Please enter the username/password!");
      }
      else{
      Axios.put("https://crud-app02.herokuapp.com/editusername", {
        username: newUsername,
        id: id,
      })
      .then((response) =>{
        setUserList(UserList.map((val) => {
          return val.id === id ? {id: val.id, username: newUsername, password: val.password} : val
        }));
      })
      }
    };

    const updatePassword = (id) => {
      if(newPassword.length < 10){
        setAddStatus("The password must contain at least 10 characters");
      }
      else{
      Axios.put("https://crud-app02.herokuapp.com/editpassword", {
        password: newPassword,
        id: id,
      })
      .then((response) =>{
        setUserList(UserList.map((val) => {
          return val.id === id ? {id: val.id, username: val.username, password: newPassword} : val
        }));
      });
    }
    };

    return( 
        <div className = "LoginAdmin">
          <button onClick={logOut}>Log Out</button>  
            <h1>Eduard Tira, welcome to the site! (Admin)</h1>
            <br>
            </br>
        
        <div className = "Registration">
            <h1>Add User</h1>
            <input type = "text" placeholder = "Username..." onChange={(e) => {setUsernameAdd(e.target.value);}}/>
            <input type = "password" placeholder = "Password..." onChange={(e) => {setPasswordAdd(e.target.value);}}/>
            <button onClick={addUser}> Add</button>
        </div>

        <br></br>
        <br></br>

        {UserList.map( (val) =>{
              return (
              <div className="tables">
                <p>Username: {val.username}</p>  
                <p>Password: {val.password}</p>
                <input type = "text" placeholder = "Username..." onChange={(e) => {setnewUsername(e.target.value); }}/>
                <button onClick ={() => {updateUser(val.id)}}>Edit</button>
                <br></br>
                <br></br>
                <input type = "password" placeholder = "Password..." onChange={(e) => {setnewPassword(e.target.value); }} />
                <button onClick = {() => {updatePassword(val.id)}}>Edit</button>
                <div>
                  <br></br>
                  <button onClick ={() => {deleteUser(val.id)}}>Delete</button>
                </div>
              </div>
              );
        })}
        <h1>{AddStatus}</h1>
        </div>
    );
}

export default LoginAdmin;