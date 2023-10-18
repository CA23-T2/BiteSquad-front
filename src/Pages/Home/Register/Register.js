import React, { useState } from 'react';
import './Register.css'; 
import logo from './images/Logo.png';
import ellipseImage1 from './images/Ellipse 6.png';
import ellipseImage2 from './images/Ellipse 7.png';
import ellipseImage3 from './images/Ellipse 12.png';
import ellipseImage4 from './images/Ellipse 9.png';

function RegisterForm() {
    const [formData, setFormData] = useState({
        ime: "",
        prezime: "",
        mail: "",
        password: "",
        brojTelefona: "",
        pol: "Musko"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                    <input type="text" name="ime" value={formData.ime} onChange={handleChange}  placeholder="Marko"  />
                </label>
                <label>
                    Prezime
                    <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} placeholder="Markovic"/>
                </label>
              </div  >
                <label>
                    Mail
                    <input type="email" name="mail" value={formData.mail} onChange={handleChange} placeholder="markomarkovic@gmail.com" />
                </label>
                <img src={ellipseImage3} alt="Ellipse Image" className='ellipse-style3'/>
                <label>
                    Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='***************' />
                </label>
                <img src={ellipseImage4} alt="Ellipse Image" className='ellipse-style4'/>
                <label>
                    Broj telefona
                    <input type="text" name="brojTelefona" value={formData.brojTelefona} onChange={handleChange}  placeholder="065114124"/>
                </label>
                <label>
                    Pol
                    <select name="pol" value={formData.pol} onChange={handleChange}>
                        <option value="Musko" >Musko</option>
                        <option value="Zensko">Zensko</option>
                    </select>
                </label>
                <button type="submit"><strong>Registruj se</strong></button>
            </form>
            <p className='boja-p'>Da li imate nalog? <a href="#">Prijavi se</a></p>
        </div>
    );
}

export default RegisterForm;
