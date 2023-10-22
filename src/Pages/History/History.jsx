import "./History.scss"
import logo from "../../asesst/BiteSquad.svg";
import clock from "../../asesst/clck.svg";
import arrow from "../../asesst/arrowDown.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Config from "../../config";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Nav from "../../Nav";
import arrw from "../../asesst/arrw.svg";

function History(props) {
    const Navigate = useNavigate()
    const token = Cookies.get("token")
    const [orders, setOrders] = useState([]);
    const [rate, setRate] = useState(0);
    const [feedback, setfeedback] = useState("");
    const [mealToRate, setMeal] = useState(0)
    useEffect(() => {
        const Orders = async () => {
            await axios.get(Config.apiUrl + "api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response)
                    setOrders(response.data.data)
                })
        }
        Orders();


    }, [])
    const rateMeal = async () => {
        await axios.post(Config.apiUrl + "api/meals/" + mealToRate + "/ratings/new", {
            rating: rate,
            feedback_comments: feedback
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
            })
    }
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRate(newRating)
    };
    const [activeOrder, setActive] = useState(0)
    return (
        <div className="History">


            <div className="krug">
                <img src={require("../../asesst/bsW.png")} alt="" />
            </div>
            < header>
                <img src={logo} alt="" />
            </header>
            <div className="Narudzbe">
                {
                    orders.map((e, key) => {

                        return (
                            <div className="Narudzba" key={key} onClick={() => { activeOrder === e.id ? setActive(0) : setActive(e.id) }} id={e.id === activeOrder ? "opened" : ""} >
                                <div className="Help">
                                    <h3>Narudžba #{e.id}</h3>
                                    <span id="date">
                                        <h3>Datum porucivanja</h3>
                                        <p>{e.created_at}</p>
                                    </span>
                                    <span className="Status">{e.status}</span>
                                    <img id="arrow" src={arrow} alt="" />
                                </div>

                                <span>
                                    {e.meals.map((el, key) => {
                                        return (
                                            <div className="Meal">
                                                <img src={require("../../asesst/burger.png")} alt="" />
                                                <p>{el.meal_name}</p>

                                                {e.status === "Dostavljeno" ? <span className="rate" onClick={() => setMeal(el.id)}>Ocijeni</span> : <span className="rate" id="disabled" onClick={() => setMeal(el.id)}>Ocijeni</span>}
                                                <span><p>Količina</p>{el.quantity}</span>
                                                <span><p>Cijena</p>{el.price}$</span>
                                            </div>
                                        )
                                    })}
                                </span>

                            </div>
                        )
                    })
                }

                <br />
                <br />
            </div>

            {activeOrder !== 0 ?
                <div className="popup">
                    <div className="Order">

                        {
                            orders.filter(ord => ord.id === activeOrder).map((e, key) => {

                                return (
                                    <>
                                    <h3><img id="leftarw" onClick={() => setActive(0)} src={arrw} alt="" />Poružbina #{e.id}</h3>
                                        <div className="Help">

                                            <span id="date">
                                                <h4>Datum porucivanja: </h4>
                                                <p> {e.created_at}</p>
                                            </span>
                                            <div className="helperRow">
                                                <p>Status:</p>
                                                <span className="Status">{e.status}</span>
                                            </div>
                                            
                                            {e.status === "Gotovo" ? null : <span className="otkazi">Otkaži</span>}

                                        </div>
                                        <h2>Obroci</h2>

                                        {e.meals.map((el, key) => {
                                            return (
                                                <><div className="Meal">
                                                    <img src={require("../../asesst/burger.png")} alt="" />
                                                    <p>{el.meal_name}</p>

                                                    <span id="kolicina">{el.quantity}</span>
                                                    <span>{el.price}$</span>
                                                </div>
                                                    {e.status === "Gotovo" ? <span className="rate" onClick={() => setMeal(el.id)}>Ocijeni</span> : <span className="rate" id="disabled" >Ocijeni</span>}
                                                </>

                                            )
                                        })}

                                    </>

                                )
                            })
                        }

                    </div>
                </div>
                : null}
            {mealToRate !== 0 ?
                <div className="popup">
                    <div className="ratingMeal">
                        <h3>Vaša ocjena</h3>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            color="#B3B4BA"
                        />
                        <input type="text" onChange={(e) => setfeedback(e.currentTarget.value)} placeholder="Upisi komentar" />
                        <button onClick={() => { rateMeal(); setMeal(0) }}>Ocijeni</button>
                    </div>
                </div>
                : null}
            <Nav></Nav>
        </div>
    )
}

export default History;