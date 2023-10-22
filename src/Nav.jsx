import home from "./asesst/home.svg"
import settings from "./asesst/Setting.svg"
import message from "./asesst/Message.svg"
import notifi from "./asesst/Notification.svg";
import users from "./asesst/2User.svg";
import BiteSquad from "./asesst/BiteSquad.svg"
import trash from "./asesst/Trash.svg"
import fire from "./asesst/fire.svg"
import clock from "./asesst/clock.svg"
import star from "./asesst/star.png"
import Exit from "./asesst/Exit.svg"
import bar from "./asesst/bar.svg"
import burger from "./asesst/burger.svg"
function Nav() {
    return (
        <nav>
            <div className="active">
                <img src={home} alt="" />
            </div>
            <div>
                <img  src={message} alt="" />
            </div>
            <div>
                <img src={notifi} alt="" />
            </div>
            <div>
                <img src={users} alt="" />
            </div>
            <div>
                <img src={settings} alt="" />
            </div>
           
        </nav>
    )
}

export default Nav;