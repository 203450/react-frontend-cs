import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./register.css";

function App() {

  //Método para redireccionamiento

  const navigate = useNavigate();

  const Loginv = () => {
    navigate('/')
  }

  //Método para consumir la creación de usuarios

  const consumir_crear = () => {

    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value
    }

    axios
      .post("http://localhost:8000/api/v1/create_user/", postData, {
        Headers: { 'Content-Type': 'application/json', },
      })
      .then(response => {
        console.log(response.data);
        Loginv();
      })
  }

  return (

    <div className="boxregister">
      <form>
        <br></br>
        <label className="labelheader">
          Registrarse
        </label>
        <br></br><br></br>
        <label className="labelregister">
          Ingrese el nombre de usuario:
        </label>
        <input className="inputdatos_r" type="text" id="user" required/>
        <br></br>
        <label className="labelregister">
          Ingrese el nombre:
        </label>
        <input className="inputdatos_r" type="text" id="nombre" required/>
        <br></br>
        <label className="labelregister">
          Ingrese apellido:
        </label>
        <input className="inputdatos_r" type="text" id="apellido" required/>
        <br></br>
        <label className="labelregister">
          Ingrese la contraseña:
        </label>
        <input className="inputdatos_r" type="password" id="pass" required/>
        <br></br>
        <label className="labelregister">
          Repita la contraseña:
        </label>
        <input className="inputdatos_r" type="password" id="pass2" required/>
        <br></br>
        <label className="labelregister">
          Ingrese el correo:
        </label>
        <input className="inputdatos_r" type="email" id="correo" required/>
      </form>
      <br></br>
      <button className="button is-black is-rounded" onClick={consumir_crear}>
        Registrarse
      </button>
      <button className="button is-black is-rounded" onClick={Loginv}>
        Volver al inicio de sesión
      </button>
    </div>

  );
}

export default App;