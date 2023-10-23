
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
import Profile from './Pages/Profile/Profile';
import History from "./Pages/History/History"
import LoadingScreen from "./LoadingScreen"
function App() {

  const [userMail, setMail] = useState();
  const [Name, setName] = useState("");
  const [username, setUsername] = useState();
  const [userRole, setRole] = useState();
  const [load, setLoad] = useState(false);
  useEffect(() => {
  const token = Cookies.get('token');

    const fetchApiData = async () => {

      await axios.get(Config.apiUrl + "api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setName(response.data.first_name + " " + response.data.last_name)
          setRole(response.data.role);
          setMail(response.data.email);
          setUsername(response.data.username)
        })
    }
    if (!token || token === null) {
      console.log("a")
    } else {
      fetchApiData();
    }

  });
 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={load === true ? <LoadingScreen /> : null}>
          <Route path="Home" element={<><Header /><Home username={username} /></>} />
          <Route path='/item' element={<><Header /><Item /></>} />
          <Route path='/history' element={<><History /></>} />
          <Route path='/Profile' element={<><Profile name={Name} username={username} email={userMail} role={userRole} /></>} />
          <Route index element={<Login />} />

        </Route>
        <Route>
          <Route path='/login' element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>


  );





}

export default App;
