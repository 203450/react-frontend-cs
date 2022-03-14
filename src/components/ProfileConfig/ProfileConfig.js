import React from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfileConfig.css";

const EditProfile = () => {

    var token = localStorage.getItem("token");
    var id_user = localStorage.getItem("user_id");

    //Declaración de variables auxiliares

    var img = "";
    var aux_user = "";
    var aux_fname = "";
    var aux_lname = "";
    var aux_email = "";

    //Método para redirecionamiento

    const navigate = useNavigate();

    const Profileview = () => {
        navigate('/Profile')
    }

    //Método para obtener datos y url de imagen del backend

    axios
        .get("http://localhost:8000/api/v1/user/profile/" + id_user, {
            headers: {
                'Authorization': "Token " + token,
            },
        })

        .then((response) => {

            if (response.data.url_image == null) {
                img = "http://127.0.0.1:8000/assets/img/Default.jpg"
            } else {
                img = "http://localhost:8000/assets" + response.data.url_image;
            }
            document.getElementById("image").src = img;
            aux_user = response.data.username;
            aux_fname = response.data.first_name;
            aux_lname = response.data.last_name;
            aux_email = response.data.email;
            document.getElementById("aux_user").value = aux_user;
            document.getElementById("aux_fname").value = aux_fname;
            document.getElementById("aux_lname").value = aux_lname;
            document.getElementById("aux_email").value = aux_email;
        })

    //Método para consumir la actualización de datos del usuario

    const consum_actdatos = () => {

        var putData = new FormData();

        var usernPut = document.getElementById("username").value;
        var firstnPut = document.getElementById("firstname").value;
        var lastnPut = document.getElementById("lastname").value;
        var emailPut = document.getElementById("email").value;

        //Peticiones para actualizar datos

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
            }).then(() => {
                alert("se actualizaron los datos");
                navigate('/Profile')
            })

    }

    //Método para consumir la actualización de imagenes

    const Updateimg = () => {

        let putData = new FormData();;

        putData.append('url_image', document.getElementById('img').files[0]);
        putData.append('id_user', id_user);

        axios.post("http://localhost:8000/api/v1/user/profile", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Token " + token,
            }
        }).then((response) => {

            img = "http://localhost:8000/assets" + response.data.url_image;
            document.getElementById('img').src = img;
            alert("Imagen de perfil actualizada")
            window.location.reload();
            
        }).catch((error) => {

            console.log(error.response);
            if (error.response.data.id_user) {
                axios.put("http://localhost:8000/api/v1/user/profile/" + id_user, putData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Token " + token,
                    }
                }).then((response) => {

                    img = "http://localhost:8000/assets" + response.data.url_image;
                    document.getElementById('img').src = img;
                    alert("Imagen de perfil actualizada")
                    window.location.reload();
                })
            }
        })
    }

    return (

        <div className="boxconfig">
            <img className="imagep" id="image" />
            <br></br>
            <input className="button is-black" accept="image/*" type="file" id="img" />
            <button className="button is-black" onClick={Updateimg}>
                Guardar imagen
            </button>
            <div className="boxProfile">
                <table className="tablaconfig">
                    <tr><td><label className="labeltexto">Username:</label></td><td><input className="inputdatos" id="aux_user" readOnly /></td></tr>
                    <tr><td colspan="2"><input className="inputactdatos" id="username" /></td></tr>
                    <tr><td><label className="labeltexto">Nombre:</label></td><td><input className="inputdatos" id="aux_fname" readOnly /></td></tr>
                    <tr><td colspan="2"><input className="inputactdatos" id="firstname" /></td></tr>
                    <tr><td><label className="labeltexto">Apellido:</label></td><td><input className="inputdatos" id="aux_lname" readOnly /></td></tr>
                    <tr><td colspan="2"><input className="inputactdatos" id="lastname" /></td></tr>
                    <tr><td><label className="labeltexto">Correo:</label></td><td><input className="inputdatos" id="aux_email" readOnly /></td></tr>
                    <tr><td colspan="2"><input className="inputactdatos" id="email" /></td></tr>
                </table>
            </div>
            <button className="button is-black is-rounded" onClick={consum_actdatos}>
                Actualizar
            </button>
            <button className="button is-black is-rounded" onClick={Profileview}>
                Regresar al perfil
            </button>
        </div>

    )
}

export default EditProfile