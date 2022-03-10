import axios from 'axios';
import React, { Component } from "react";
import "./login.css";
import {
  NavLink,
  useParams
}from "react-router-dom";

function App() {

  const consumir_login = (e) => {
    e.preventDefault()
    var postData = {
      username: document.getElementById('userl').value,
      password: document.getElementById('passl').value,
    }

    axios
      .post("http://localhost:8000/api/v1/login/", postData, {
        Headers: { "Content-Type": "application/json", },
      })

      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('email', response.data.email)
        window.location = '/Profile'
      }).catch(
        (error) => {
          console.log(error.response.data);
        }
      )
  }
  return (

    <div>
      <NavLink to="/Register">
        Registro
      </NavLink>
      Login

      <div>
        <div className="box_login">
          <form>
            <br></br><label className="label_login">
              Ingrese el nombre del usuario: 
            </label><br></br>
            <input className = "cuadrito_login" type="text" id='userl' required />
            <br></br><label className="label_login">
              Ingresa la contraseña: 
            </label><br></br>

            <input className = "cuadrito_login" type="text" id='passl' required />
            <header className="App-header">
            <br></br><button className="boton_login"onClick={consumir_login}>Ingresar</button>
            </header> 
          </form>
        </div>
      </div>

    </div>

  );
}

export default App;