import logo from './asesst/logo.svg';
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Header from './Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Config from "./config.js"
import Item from "./Pages/Item/Item"
import Cart from './Pages/Cart/Cart';
import Profile from './Pages/Profile/Profile';
import Nav from './Nav';
import History from "./Pages/History/History"
import LoadingScreen from "./LoadingScreen"
function App() {

  const [userMail, setMail] = useState();
  const [Name, setName] = useState();
  const [username, setUsername] = useState();
  const [userRole, setRole] = useState();
  const [load, setLoad] = useState(true);
  const token = Cookies.get('token');
console.log(token);
  useEffect(() => {
    const fetchApiData = async () => {

      await axios.get(Config.apiUrl+"api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
          console.log(response);
         setName(response.data.first_name + " " + response.data.last_name)
         setRole(response.data.role);
         setMail(response.data.email);
         setUsername(response.data.username)
      })
    }
    if (token != null) {
      fetchApiData();
    } 

  }, []);
  useEffect(() => {
    window.addEventListener("load", () =>  {
      setLoad(false);
    })
  })
  if(load === false) {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<><Header/><Home username={username}/></>}/>
          <Route path='/item' element={<><Header/><Item/></>}/>
          <Route path='/history' element={<><History/></>}/>
          <Route path='/Profile' element={<><Profile name={Name} username={username} email={userMail}/><Nav></Nav></>}/>
        </Route>
        <Route>
        <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    

      );
    
  } else {
    return(<LoadingScreen/>)
  }
  
}

export default App;
