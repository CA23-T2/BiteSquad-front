import home from "./asesst/home.svg"
import settings from "./asesst/Setting.svg"
import message from "./asesst/Message.svg"
import notifi from "./asesst/Notification.svg";
import users from "./asesst/2User.svg";
import history from "./asesst/history.svg"
import cart from "./asesst/cart.svg"
import { useNavigate } from "react-router-dom";
function Nav() {
    const Navigate = useNavigate()
    return (
        <nav>
            <div onClick={() => Navigate("/")}className="active">
                <img src={home} alt="" />
            </div>
            <div>
                <img  src={history} onClick={() => Navigate("/history")}alt="" />
            </div>
            <div>
                <img src={cart} alt="" />
            </div>
            <div>
                <img onClick={()=> Navigate("/profile")}src={users} alt="" />
            </div>
            <div>
                <img src={settings} alt="" />
            </div>
           
        </nav>
    )
}

export default Nav;