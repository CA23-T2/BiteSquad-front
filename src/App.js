import logo from './asesst/logo.svg';
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token*\=\s*([^;]*).*$)|^.*$/, "$1");
  const [userMail, setMail] = useState();
  const [userRole, setRole] = useState();
  console.log(cookieValue)
  
  useEffect(() => {
    const fetchApiData = async () => {
      await axios.get("http://4.232.160.128/api/user", {
        headers: {
          Authorization: `Bearer ${cookieValue}`
        }
      })
        .then((response) => {
          console.log(response.data);
         // setMail(response.data.success.first_name + " " + response.data.success.last_name)
         // setRole(response.data.success.role_id);
        })
    }
    if (cookieValue !== "") {
      fetchApiData();
    }

  }, [1]);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/home" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
