import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {

  var token = localStorage.getItem('token');
  var user_id = localStorage.getItem('user_id');
  var img = "";
  var usern = "";
  var firstn = "";
  var lastn = "";
  var email = "";

  const navigate = useNavigate()

  const redconfig = () => {
    navigate('/Profile/config')
  }

  console.log(token)

  axios
    .get("http://localhost:8000/api/v1/user/profile/" + user_id, {
      headers: {
        'Authorization': "Token " + token,
      },
    })
    .then((response) => {
      // console.log(response.data);

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
      console.log(img);
      console.error("Error al obtener la imagen");
    });



  return (
    <div>Perfil
      <div className="container_profile">
        <div>
          <img className="img_profile" id="imagen"/>
        </div>
        <div className="fields_profile">
          <input className="input_profile" id="usern" readOnly ClassName="inputlogin"/><br></br>
          <input className="input_profile" id="firstn" readOnly ClassName="inputlogin"/><br></br>
          <input className="input_profile" id="lastn" readOnly ClassName="inputlogin"/><br></br>
          <input className="input_profile" id="email" readOnly ClassName="inputlogin-log"></input>
        </div>
      </div>
      <br></br>

      <div onClick={redconfig}>
        <button>
          Change Profile
        </button>
      </div>
    </div>

  )
}

export default Profile