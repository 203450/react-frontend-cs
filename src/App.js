import Login from './components/Login/login';
import Register from './components/Register/register';
import Profile from './components/Profile/Profile';
import ProfileConfig from './components/ProfileConfig/ProfileConfig';
import 'bulma/css/bulma.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>

    {/* Rutas de react-dom*/}

    <Routes>
      <Route path = "/" element = {<Login/>}/>
      <Route path = "/Register" element = {<Register/>}/>
      <Route path = "/Profile" element = {<Profile/>}/>
      <Route path = "/Profile/Config" element = {<ProfileConfig/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
