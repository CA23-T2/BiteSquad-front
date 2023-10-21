import React, { useState } from 'react';
import './Register.css'; 
import logo from "../../asesst/BiteSquad.svg";
import ellipseImage1 from "../../asesst/Ellipse6.png";
import ellipseImage2 from "../../asesst/Ellipse7.png";
import ellipseImage3 from "../../asesst/Ellipse12.png";
import ellipseImage4 from "../../asesst/Ellipse9.png";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        username: "",
        password_confirmation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await axios.post("http://4.232.160.128/api/register", formData)
        .then(response => {
            console.log(response);
        })
    };

    return (
        <div className="registration-form">
           <img src={logo} alt="BiteSquad Logo" className='logo-center'/>
           <img src={ellipseImage1} alt="Ellipse Image" className='ellipse-style1'/>
           <img src={ellipseImage2} alt="Ellipse Image" className='ellipse-style2'/>
            <h3 className='h3-color'>Registruj se</h3>

            <form onSubmit={handleSubmit}>
              <div className="name-wrapper">
                <label>
                    Ime
                    <input type="text" name="name"  onChange={handleChange}  placeholder="Marko"  />
                </label>
                <label>
                    Prezime
                    <input type="text" name="surname" value={formData.prezime} onChange={handleChange} placeholder="Markovic"/>
                </label>
              </div  >
              <label>
                    username
                    <input type="text" name="username"  onChange={handleChange}  placeholder="065114124"/>
                </label>
                <label>
                    email
                    <input type="email" name="email"  onChange={handleChange} placeholder="markomarkovic@gemail.com" />
                </label>
                <img src={ellipseImage3} alt="Ellipse Image" className='ellipse-style3'/>
                <label>
                    Password
                    <input type="password" name="password"  onChange={handleChange} placeholder='***************' />
                </label>
                <label>
                   Confirm Password
                    <input type="password" name="password_confirmation"  onChange={handleChange} placeholder='***************' />
                </label>
                <img src={ellipseImage4} alt="Ellipse Image" className='ellipse-style4'/>
                
                {/** <label>
                    Pol
                    <select name="pol" value={formData.pol} onChange={handleChange}>
                        <option value="Musko" >Musko</option>
                        <option value="Zensko">Zensko</option>
                    </select>
                </label>*/}
                <button type="submit"><strong>Registruj se</strong></button>
            </form>
            <p className='boja-p'>Da li imate nalog? <Link to="/Login">Prijavi se</Link></p>
        </div>
    );
}

export default RegisterForm;
