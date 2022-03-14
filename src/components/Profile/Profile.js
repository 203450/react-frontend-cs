import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {

  var token = localStorage.getItem('token');
  var user_id = localStorage.getItem('user_id');

  //Declaración de variables auxiliares (datos de usuario)

  var img = "";
  var usern = "";
  var firstn = "";
  var lastn = "";
  var email = "";

  //Métodos para redireccionamiento

  const navigate = useNavigate()

  const Profileconfig = () => {
    navigate('/Profile/config')
  }

  const Loginv = () => {
    navigate('/')
  }

  //Métodos para utilizar backend 

  axios
    .get("http://localhost:8000/api/v1/user/profile/" + user_id, {
      headers: {
        'Authorization': "Token " + token,
      },
    })
    .then((response) => {

      img = "http://localhost:8000/assets" + response.data.url_image;
      usern = response.data.username;
      firstn = response.data.first_name;
      lastn = response.data.last_name;
      email = response.data.email;

      document.getElementById("imagen").src = img;
      document.getElementById("usern").placeholder = usern;
      document.getElementById("firstn").placeholder = firstn;
      document.getElementById("lastn").placeholder = lastn;
      document.getElementById("email").placeholder = email;
    })
    .catch((error) => {
      img = "http://127.0.0.1:8000/assets/img/Default.jpg"
      document.getElementById("imagen").src = img;
    });



  return (
      <div className="boxperfil">
        <img className="imagep" id="imagen" />
        <br></br>
        <div>
          <input className="inputdatos" id="usern" readOnly/><br></br>
          <input className="inputdatos" id="firstn" readOnly/><br></br>
          <input className="inputdatos" id="lastn" readOnly/><br></br>
          <input className="inputdatos" id="email" readOnly/><br></br>
        </div>
        <button className="button is-black is-rounded" onClick={Profileconfig}>
          Actualizar perfil
        </button>
        <button className="button is-black is-rounded" onClick={Loginv}>
          Volver al inicio de sesión
        </button>
      </div>

  )
}

export default Profile