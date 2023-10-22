import "./Profile.scss"
import logo from "../../asesst/BiteSquad.svg";
import clock from "../../asesst/clck.svg";
import arrow from "../../asesst/arrw.svg";
import { useNavigate } from "react-router-dom";
function Profile(props) {
    const Navigate = useNavigate()
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
                            <h3>{props.username}</h3>
                            <p>{props.email}</p>
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            alt="" />
                    </div>
                    <div className="buttons">
                        <button>Uredi profil</button>

                        <button>Istorija</button>
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
                            <li>Provjerite ima li ažuriranja <img src={arrow} alt="" /></li>
                            <li>Odjaviti se  <img src={arrow} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;