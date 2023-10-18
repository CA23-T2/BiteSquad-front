import home from "../../asesst/home.svg"
import settings from "../../asesst/Setting.svg"
import message from "../../asesst/Message.svg"
import notifi from "../../asesst/Notification.svg";
import users from "../../asesst/2User.svg";
import BiteSquad from "../../asesst/BiteSquad.svg"
import trash from "../../asesst/Trash.svg"
import fire from "../../asesst/fire.svg"
import clock from "../../asesst/clock.svg"
import star from "../../asesst/star.png"
import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function App() {
    const token = Cookies.get('token');
    const [meals, SetMeals] = useState([]);
    const [cart, setCart] = useState([1])
    useEffect(() => {
        const FetchMeals = async () => {
            await axios("http://4.232.160.128/api/meals", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data.data[0].data)
                    SetMeals(response.data.data[0].data)
                })
        }
        FetchMeals();
    }, [])

    const mealOrder = async () => {
        await axios.post("http://4.232.160.128/api/orders/new", 
        {
            meals: cart,
            quantities: [1,1],
            delivery_date: "2023-10-13T15:30:00.000Z"
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) 
        .then(response => {
            console.log(response);
        })
    }
    return (
        <>
            <header>
                <img src={BiteSquad} alt="" />
                <div id="search">
                    <input type="text" name="" id="" placeholder="Pretrazi hranu" />
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

                        {
                            meals.map((e) => {
                                return (<div onClick={(event) => {setCart([...cart, e.id]); console.log(e.id)}} className="Meal">
                                    <img src={require("../../asesst/burger.png")} alt="" />
                                    <h3>{e.meal_name}</h3>
                                    <p>{e.description}</p>
                                    <div className="helper">
                                        <span><img src={star} alt="" /> 4+</span>
                                        <span><img src={fire} alt="" /> 300kcal</span>
                                        <span><img src={clock} alt="" /> 35min</span>
                                    </div>

                                </div>)
                            })
                        }


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
                        {
                            meals.filter(item => cart.includes(item.id)).map(e => {
                               
                                return (
                                    
                                    <div>
                                        <img src={require("../../asesst/burger.png")} alt="" />

                                        <h3>{e.meal_name}</h3>

                                        <span className="amount">3</span>
                                        <span className="remove" onClick={(event) => {setCart(cart.filter((el) => el !== e.id)); console.log(e.id)}}>
                                            <img src={trash} alt="" />
                                        </span>
                                    </div>
                                )
                            })
                        }


                        <button onClick={() => mealOrder()}>Potvrdi</button>
                    </div>

                </div>
            </section>
        </>
    );
}

export default App;
