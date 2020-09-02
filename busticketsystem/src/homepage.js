import React from 'react';
import logo from './logo.svg';
import './App.css';
import App1 from './login/loginRegister';
import image1 from "./image.jpg";
import LoginRegister from './login/loginRegister';
//import Register from './login/registration'
//import Login from './login/login';

function Homepage() {
  return (

    <div id="App">
      <div class="full-height">
        
        <div id="formArea">
          <LoginRegister />
        </div>
      </div>


    </div>


  );
}

export default Homepage;
