import React from "react";
import {Routes, Route} from 'react-router-dom';
import LoginAdmin from "./adminlogin";
import Home from "./Home";
import LoginUser from "./LoginUser";



function App() {
  return (
    <div>
        <Routes>  
          <Route exact path = "/" element = {<Home />}/>
          <Route exact path = "/adminlogin" element = {<LoginAdmin />}/>
          <Route exact path = "/userlogin" element ={<LoginUser />}/>
        </Routes>
      </div>
  );
}

export default App;