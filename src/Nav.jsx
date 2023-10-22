import home from "./asesst/home.svg"
import settings from "./asesst/Setting.svg"
import Exit from "./asesst/Exit.svg"

import users from "./asesst/2User.svg";
import history from "./asesst/history.svg"
import cartt from "./asesst/cart.svg"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Nav() {
    const Navigate = useNavigate()
    return (
        <nav>
                    <div className="active" onClick={() => Navigate("/Home")}>
                        <img src={home} alt="" />
                    </div>
                    <div>
                        <img src={history} onClick={() => Navigate("/history")} alt="" />
                    </div>
                    <div id="cart" onClick={() => Navigate("/Home")}>
                        <img  src={cartt}  alt="" />
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