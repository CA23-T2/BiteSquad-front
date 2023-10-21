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

function LoginForm() {
  const Navigate =useNavigate();
  //const cookies = new Cookies();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  useEffect(() => {
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(cookieValue !== "") {
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
    await axios.post("http://4.232.160.128/api/login", formData)
        .then(response => {
            console.log(response.data.data.token);
            const token = response.data.data.token;
            Cookies.set('token', token, { expires: 7 });

            Navigate("../Home");
        })
  };

  return (
    <div className="registration-form">
      <img src={logo} alt="BiteSquad Logo" className="logo-center" />
      <br/>
      <br/>
      <img src={ellipseImage1} alt="Ellipse Image" className="ellipse-style1" />
     
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
        <img
          src={ellipseImage3}
          alt="Ellipse Image"
          className="ellipse-style3"
        />
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
        <img
          src={ellipseImage4}
          alt="Ellipse Image"
          className="ellipse-style4"
        />
        <div className="checkbox-and-forgot">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}/>
            <span>sacuvaj moje podatke</span>
          </label>
          <span className="zaboravili-lozinku">Zaboravili ste lozinku?</span>
        </div>
        <br/>
      <img src={ellipseImage2} alt="Ellipse Image" className="ellipse-style2" />
        <button type="submit">
          <strong>Prijavi se</strong>
        </button>
      </form>
      <p className="boja-p">
        Nemate nalog? <a href="#">Registruj se</a>
      </p>
    </div>
  );
}

export default LoginForm;
