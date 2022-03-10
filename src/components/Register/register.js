import axios from 'axios';
import {
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";

function App() {

  const consumir_crear = () => {
    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value

    }
    // alert("Hola login");
    axios
      .post("http://localhost:8000/api/v1/create_user/", postData, {
        Headers: { 'Content-Type': 'application/json', },
      })
      .then(response => {
        console.log(response.data);
      }).catch(
        (error) => {
          console.log(error.response.data);
        }

      )
  }

  return (

    <div>
      <NavLink to="/">
      Log in
      </NavLink>
      Registro
      <div>
        <div className="box">
          <form className="form_register">
            <br></br><label className="label_register">
              Ingrese el nombre del usuario: 
            </label>
            <input type="text" id="user" required />
            <br></br><label className="label_register">
              Ingresa la contraseña: 
            </label>
            <input type="password" id="pass" required />
            <br></br><label className="label_register">
              Ingresa la contraseña nuevamente: 
            </label>
            <input type="password" id="pass2" required />
            <br></br><label className="label_register">
              Ingrese el correo: 
            </label>
            <input type="email" id="correo" required />
            <br></br><label className="label_register">
              Ingrese el nombre: 
            </label>
            <input type="text" id="nombre" required />
            <br></br><label className="label_register">
              Ingrese apellido: 
            </label>
            <input type="text" id="apellido" required />
          </form>
        </div>
      </div>

      <header className="App-header">
        <button onClick={consumir_crear}>Funcion alert</button>
      </header>
    </div>

  );
}

export default App;