import React, { useEffect, useState } from 'react';
import './Register.scss'; 
import logo from "../../asesst/BiteSquad.svg";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Config from "../../config.js"
import Cookies from 'js-cookie';
function RegisterForm() {
  const Navigate =useNavigate();

    useEffect(() => {
        if (Cookies.get("token") != null) {
            Navigate("/Home");
          }
    })

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
        await axios.post(Config.apiUrl+"api/register", formData)
        .then(response => {
            console.log(response.data.data.token);
            const token = response.data.data.token;
            Cookies.set('token', token, { expires: 7 });

            Navigate("/Home");
        })
    };

    return (
        <>
           
        <div className="registration-form">
        <img src={logo} alt="BiteSquad Logo" className='logo-center'/>
           
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
                <label>
                    Password
                    <input type="password" name="password"  onChange={handleChange} placeholder='***************' />
                </label>
                <label>
                   Confirm Password
                    <input type="password" name="password_confirmation"  onChange={handleChange} placeholder='***************' />
                </label>
                
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
       

        </>
    );
}

export default RegisterForm;
