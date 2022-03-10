import Login from './components/Login/login'
import Register from './components/Register/register'
import Profile from './components/Profile/Profile'
import ProfileConfig from './components/ProfileConfig/ProfileConfig'

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login/>}/>
      <Route path = "/Register" element = {<Register/>}/>
      <Route path = "/Profile" element = {<Profile/>}/>
      <Route path = "/Profile/Config" element = {<ProfileConfig/>}/>
      {/* <Route path = "/Profile/:id" element = {<Profile/>}/>
      <Route path = "/Profile/:id/config" element = {<Profile/>}/> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
