import home from "../../home.svg"
import settings from "../../Setting.svg"
import message from "../../Message.svg"
import notifi from "../../Notification.svg";
import users from "../../2User.svg";
import BiteSquad from "../../BiteSquad.svg"
import "./Home.scss";
function App() {
    return (
        <>
            <header>
                <img src={BiteSquad} alt="" />
            </header>
            <nav>
                <div className="active">
                    <img src={home} alt="" />
                </div>
                <div>
                    <img src={message} alt="" />
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
            <section>
                <div className="filter">
                    <div className="active">
                        <p>Topla Jela</p>
                    </div>
                    <div>
                        <p>Topla Jela</p>
                    </div>
                    <div>
                        <p>Topla Jela</p>
                    </div>
                    <div>
                        <p>Topla Jela</p>
                    </div>
                    <div>
                        <p>Topla Jela</p>
                    </div>  
                </div>
                <h2>Odabir jela</h2>
                <div className="Food">
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Dupli  cheeseburge</h3>
                        <p>06h-08h</p>
                    </div>
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Dupli  cheeseburge</h3>
                        <p>06h-08h</p>
                    </div>
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Dupli  cheeseburge</h3>
                        <p>06h-08h</p>
                    </div>
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Burger</h3>
                        <p>06h-08h</p>
                    </div>
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Burger</h3>
                        <p>06h-08h</p>
                    </div>
                    <div>
                        <img src={require("../../burger.png")} alt="" />
                        <h3>Burger</h3>
                        <p>06h-08h</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
