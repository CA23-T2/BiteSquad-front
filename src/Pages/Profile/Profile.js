import "./Profile.scss"
import logo from "../../asesst/BiteSquad.svg";
import clock from "../../asesst/clck.svg";
import arrow from "../../asesst/arrw.svg";
import Exit from "../../asesst/Exit.svg"

import { useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import Config from "../../config";
import Nav from "../../Nav";
function Profile(props) {
    const Navigate = useNavigate()
    const [edit, setEdit] = useState(false);
    const token = Cookies.get("token")
    const [username, setUsername] = useState(props.username)
    const EditProfile = async () => {
        await axios.post(Config.apiUrl + "api/users/update", {
            username: username,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
            })
        setEdit(!edit)
    }
    return (
        <>
            <div className="ProfDesk">

                <div className="krug">
                    <img src={require("../../asesst/bsW.png")} alt="" />
                </div>
                <div className="Profile">
                    <div className="helper">
                        <div className="Text">
                        <h2>{props.name}</h2>
                            {edit === true ? <input type="text" defaultValue={props.username} onChange={(e) => setUsername(e.currentTarget.value)} />
                                : <h3>{props.username}</h3>

                            }
                            
                            <p>{props.email}</p>

                        </div>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            alt="" />
                    </div>
                    <div className="buttons">
                        <button onClick={() => { edit === true ? EditProfile() : setEdit(!edit) }}>{edit===true ?"Sacuvaj":"Uredi profil"}</button>

                        <button>Istorija</button>
                    </div>
                </div>
                <div className="Settings">
                    <div onClick={() => Navigate("/Home")}>
                        <img src={Exit} alt="" />
                        <h4>Pocetna strana</h4>
                    </div>
                    <div>
                        <img src={Exit} alt="" />
                        <h4>Odjavi se</h4>
                    </div>
                    <div>
                        <img src={Exit} alt="" />
                        <h4>Odjavi se</h4>
                    </div>
                    <div>
                        <img src={Exit} alt="" />
                        <h4>Odjavi se</h4>
                    </div>

                </div>
            </div>
            <div className="profMob">
                <header>
                    <img src={logo} alt="" />
                </header>
                <div className="Content">
                    <div className="helper1">
                        <img onClick={() => Navigate("/")} src={arrow} alt="" />
                        <h2>Profile</h2>
                    </div>

                    <div className="User">
                        <div className="helper">
                            <h3>{props.username}</h3>
                            <p>{props.email}</p>
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                    </div>
                    <div className="Opt">
                        <div>
                            <img src={clock} alt="" />
                            <p>Istorija</p>
                        </div>
                        <div>
                            <img src={clock} alt="" />
                            <p>Istorija</p>
                        </div>
                        <div>
                            <img src={clock} alt="" />
                            <p>Istorija</p>
                        </div>
                    </div>
                    <div className="General">
                        <h2>General</h2>
                        <ul>
                            <li>Ostalo <img src={arrow} alt="" /></li>
                            <li>Pomoć i podrška <img src={arrow} alt="" /></li>
                            <li>Pošaljite povratne informacije  <img src={arrow} alt="" /></li>

                            <li>Ocjena <img src={arrow} alt="" /></li>

                            <li onClick={() => { Cookies.remove("token"); Navigate("/login") }}>Odjaviti se  <img src={arrow} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Nav></Nav>
        </>
    )
}

export default Profile;