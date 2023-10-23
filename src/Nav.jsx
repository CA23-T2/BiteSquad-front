import home from "./asesst/home.svg"
import settings from "./asesst/Setting.svg"
import Exit from "./asesst/Exit.svg"

import users from "./asesst/2User.svg";
import history from "./asesst/history.svg"
import cartt from "./asesst/cart.svg"
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faClock, } from "@fortawesome/free-regular-svg-icons";
function Nav() {
    const Navigate = useNavigate()
    const loc = useLocation()
    console.log(loc.pathname);
    return (
        <nav>
            <div onClick={() => Navigate("/home")}>
                <FontAwesomeIcon icon={faHome} color="#F9881F" />
            </div>
            <div className={loc.pathname === "/history" ? "active" :""}>
                <FontAwesomeIcon icon={faClock} onClick={() => Navigate("/history")} size="1x" color={loc.pathname === "/history" ? "white" :"#F9881F"} />

            </div>
            <div id="cart" onClick={() => Navigate("/home")}>

                <FontAwesomeIcon icon={faCartShopping} size="1x" color="#F9881F" />


            </div>
            <div id="profile">
                <img onClick={() => Navigate("/profile")} src={users} alt="" />

            </div>

            <div id="logout">
                <img src={Exit} onClick={() => { Cookies.remove("token"); Navigate("/Login") }} alt="" />
            </div>
        </nav>
    )
}

export default Nav;