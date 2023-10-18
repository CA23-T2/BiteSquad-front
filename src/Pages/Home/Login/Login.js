import React, { useState } from "react";
import "./Login.css";
import logo from "./images/Logo.png";
import ellipseImage1 from "./images/Ellipse 6.png";
import ellipseImage2 from "./images/Ellipse 7.png";
import ellipseImage3 from "./images/Ellipse 12.png";
import ellipseImage4 from "./images/Ellipse 9.png";

function LoginForm() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    rememberMe: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            name="mail"
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
