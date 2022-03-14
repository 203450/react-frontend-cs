import axios from 'axios';
import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function App() {

  //Método para redireccionamiento

  const navigate = useNavigate();

  const Registerv = () => {
    navigate('/Register')
  }

  //Método para consumir el inicio de sesión

  const consumir_login = (e) => {
    e.preventDefault()
    var postData = {
      username: document.getElementById('userl').value,
      password: document.getElementById('passl').value,
    }

    //Métodos para utilizar backend 
    
    axios
      .post("http://localhost:8000/api/v1/login/", postData, {
        Headers: { "Content-Type": "application/json", },
      })

      .then(response => {
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('user_id', response.data.user_id)
        window.location = '/Profile'
        }
      )
  }
  return (

    <div className="boxlogin">
      <form>
        <br></br>
        <label className="labelheader">
          Inicio de sesión
        </label>
        <br></br><br></br><br></br>
        <label className="labellogin">
          Ingrese el nombre del usuario
        </label>
        <br></br>
        <input className="inputdatos_l" type="text" id='userl' required />
        <br></br><br></br>
        <label className="labellogin">
          Ingrese la contraseña
        </label>
        <br></br>
        <input className="inputdatos_l" type="text" id='passl' required />
        <br></br><br></br><br></br>
        <button className="button is-black is-rounded" onClick={consumir_login}>
          Ingresar
        </button>
        <button className="button is-black is-rounded" onClick={Registerv}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default App;