import React from 'react'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProfile = () => {

    var token = localStorage.getItem("token");
    var id_user = localStorage.getItem("user_id");
    var img = "";

    const params = useParams();
    const navigate = useNavigate();

    axios
        .get("http://localhost:8000/api/v1/user/profile/" + id_user, {
        headers: {
          'Authorization': "Token " + token,
        },
        })

        .then((response) => {
            
            console.log(response.data);
            if (response.data.url_image == null) {
                img = "http://127.0.0.1:8000/assets/img/Default.jpg"
            } else {
                img = "http://localhost:8000/assets" + response.data.url_image;
            }
            document.getElementById("image").src = img;
        })
        
        .catch((error) => {
            console.log(img);
            console.error("Error al obtener la imagen");
        });

    const consum_update_user = () => {

        var putData = new FormData();

        var usernPut = document.getElementById("username").value;
        var firstnPut = document.getElementById("firstname").value;
        var lastnPut = document.getElementById("lastname").value;
        var emailPut = document.getElementById("email").value;

        putData.append('id_user', id_user);
        
        putData.append("first_name", firstnPut);
        putData.append("last_name", lastnPut);
        putData.append("username", usernPut);
        putData.append("email", emailPut);

        axios
        .put("http://localhost:8000/api/v1/user/config/" + id_user, putData, {

            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Token " + token,
            }
        }).then((response) => {
            alert("se actualizaron los datos");
            navigate('/Profile')

        }).catch((error) => {
            alert("No se pudieron actualizar los datos: ");
            console.log(error.response.data);
            console.log(usernPut)
            console.log(firstnPut)
            console.log(lastnPut)
            console.log(emailPut)
        })

    }

    const Updateimg = () => {

        let putData = new FormData();;

        putData.append('url_image', document.getElementById('img').files[0]);
        putData.append('id_user', id_user);
        
        axios.put("http://localhost:8000/api/v1/user/profile/" + id_user, putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Token " + token,
            }
        }).then((response) => {

            console.log(response.data);
            img = "http://localhost:8000/assets" + response.data.url_image;
            console.log(img);
            document.getElementById('img').src = img;
            alert("Imagen de perfil actualizada")
            window.location.reload();
            
        }).catch((error) => {
            console.log(error.response.data);
        })
    }


    return (
        <div>Profile Configuration
            <div className='container'>
                <div className='boxUp'>
                    <img id='image'/>
                    <input accept="image/*" type="file" id="img"></input>
                    <button onClick={Updateimg}>Change Image</button>
                </div>
                <div className='boxDown'>
                    <label>Username: </label>
                    <input id="username"/><br/>
                    <label>Primer Nombre: </label>
                    <input id="firstname"/><br/>
                    <label>Ultimo Nombre: </label>
                    <input id="lastname"/><br/>
                    <label>Correo: </label>
                    <input id="email"/><br/>

                    <button onClick={consum_update_user}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile