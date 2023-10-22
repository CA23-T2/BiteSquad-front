import React, { useState } from "react";
import "./Login.css";
import logo from "../../asesst/BiteSquad.svg";
import ellipseImage1 from "../../asesst/Ellipse6.png";
import ellipseImage2 from "../../asesst/Ellipse7.png";
import ellipseImage3 from "../../asesst/Ellipse12.png";
import ellipseImage4 from "../../asesst/Ellipse9.png";
import axios from "axios";
//import Cookies from 'universal-cookie';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Config from "../../config"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm() {
  const Navigate = useNavigate();
  //const cookies = new Cookies();
  const notify = (e) => toast.error(e, {
    position: "top-center", theme: "colored"
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  useEffect(() => {
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue !== "") {
      Navigate("/Home");
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      rememberMe: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await axios.post(Config.apiUrl + "api/login", formData)
      .then(response => {
        console.log(response.data.data.token);
        const token = response.data.data.token;
        Cookies.set('token', token, { expires: 7 });

        Navigate("/Home");
      })
      .catch(error => {
        console.log(error.code)
        notify(error.response.data.message)
      })
  };

  return (
    <>    <div className="registration-form">

      <img src={logo} alt="BiteSquad Logo" className='logo-center' />



      <h3 className="h3-color">Prijavi se</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Mail
          <input
            type="email"
            name="email"
            value={formData.mail}
            onChange={handleChange}
            placeholder="markomarkovic@gmail.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="***************"
          />
        </label>

        <div className="checkbox-and-forgot">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange} />
            <span>sacuvaj moje podatke</span>
          </label>
          <span className="zaboravili-lozinku">Zaboravili ste lozinku?</span>
        </div>
       
        <button type="submit">
          <strong>Prijavi se</strong>
        </button>
      </form>
      <p className="boja-p">
        Nemate nalog? <Link to="/register">Registruj se</Link>
      </p>

    </div>
      <ToastContainer />

    </>

  );
}

export default LoginForm;
