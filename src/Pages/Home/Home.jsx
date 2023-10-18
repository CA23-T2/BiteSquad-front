import home from "../../home.svg"
import settings from "../../Setting.svg"
import message from "../../Message.svg"
import notifi from "../../Notification.svg";
import users from "../../2User.svg";
import BiteSquad from "../../BiteSquad.svg"
import trash from "../../Trash.svg"
import "./Home.scss";
function App() {


    const arr = [1,2];
    arr.push(6);
    arr.splice(1)
    console.log(arr)
    return (
        <>
            <header>
                <img src={BiteSquad} alt="" />
                <div id="search">
                    <input type="text" name="" id="" placeholder="Pretrazi hranu"/>
                </div>
            </header>
            <section className="container">


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
                <section className="Center">
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
                <div className="korpa">
                    <h2>Narudzba #Anja002</h2>
                    <div className="Helper">
                        <p>Naruceno</p>
                        <p>Kolicina</p>
                    </div>
                    <hr />
                    <div className="List">
                        <div>
                            <img src={require("../../burger.png")} alt="" />
                            
                                <h3>Dupli cheeseburge</h3>
                        
                            <span className="amount">3</span>
                            <span className="remove">
                                <img src={trash} alt="" />
                            </span>
                        </div>
                        <div>
                            <img src={require("../../burger.png")} alt="" />
                            
                                <h3>Dupli cheeseburge</h3>
                        
                            <span className="amount">3</span>
                            <span className="remove">
                                <img src={trash} alt="" />
                            </span>
                        </div>
                        <div>
                            <img src={require("../../burger.png")} alt="" />
                            
                                <h3>Dupli cheeseburge</h3>
                        
                            <span className="amount">3</span>
                            <span className="remove">
                                <img src={trash} alt="" />
                            </span>
                        </div>
                        <div>
                            <img src={require("../../burger.png")} alt="" />
                            
                                <h3>Dupli cheeseburge</h3>
                        
                            <span className="amount">3</span>
                            <span className="remove">
                                <img src={trash} alt="" />
                            </span>
                        </div>
                        <button>Potvrdi</button>
                    </div>

                </div>
            </section>
        </>
    );
}

export default App;
