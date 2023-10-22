import "./History.scss"
import logo from "../../asesst/BiteSquad.svg";
import clock from "../../asesst/clck.svg";
import arrow from "../../asesst/arrowDown.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Config from "../../config";
import { useEffect, useState, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import Nav from "../../Nav";
import arrw from "../../asesst/arrw.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function History(props) {
    const Navigate = useNavigate()
    const token = Cookies.get("token")
    const [orders, setOrders] = useState([]);
    const [rate, setRate] = useState(0);
    const [feedback, setfeedback] = useState("");
    const [mealToRate, setMeal] = useState(0)
    const ref = useRef(null);
    useOutsideAlerter(ref);
    const notify = (e) => toast.success(e, {
        position: "top-center",
    });
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
    const cancel = async (e) => {
        await axios.delete(Config.apiUrl + "api/orders/" + e, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
            })
    }
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

    function useOutsideAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {

                    setMeal(0);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        });
    }
    return (
        <div className="History">


            <div className="krug">
                <img onClick={() => Navigate("/Home")}src={require("../../asesst/bsW.png")} alt="" />
            </div>
            < header>
                <img src={logo} alt="" />
            </header>
            <div className="Narudzbe">
                {
                   orders  ? orders.map((e, key) => {

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

                                                {e.status === "Gotovo" ? <span className="rate" onClick={() => setMeal(el.id)}>Ocijeni</span> : <span className="rate" id="disabled" onClick={() => notify("Obrok možrte ocijeniti samo poslije konzumacije")}>Ocijeni</span>}

                                                <span><p>Količina</p>{el.quantity}</span>
                                                <span><p>Cijena</p>{el.price}$</span>
                                            </div>
                                        )
                                    })}
                                </span>

                            </div>
                        )
                    }) : <h1>Nema postojecih narudžbi</h1>
                }

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>

            {activeOrder !== 0 & window.innerWidth < 426 ?
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

                                            {e.status === "Gotovo" ? null : <span className="otkazi" onClick={() => { cancel(e.id); notify("Porudžbina uspjesno otkazana"); setActive(0) }}>Otkaži</span>}

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
                                                    {e.status === "Gotovo" ? <span className="rate" onClick={() => setMeal(el.id)}>Ocijeni</span> : <span className="rate" id="disabled" onClick={() => notify("Obrok možrte ocijeniti samo poslije konzumacije")}>Ocijeni</span>}
                                                </>

                                            )
                                        })}
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />

                                    </>

                                )
                            })
                        }

                    </div>
                </div>
                : null}
            {mealToRate !== 0 ?
                <div className="popup">
                    <div className="ratingMeal" ref={ref}>
                        <h3>Vaša ocjena</h3>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            color="#B3B4BA"
                        />
                        <input type="text" onChange={(e) => setfeedback(e.currentTarget.value)} placeholder="Upisi komentar" />
                        <button onClick={() => { rateMeal(); setMeal(0); notify("Obrok uspjesno ocijenjen") }}>Ocijeni</button>
                    </div>
                </div>
                : null}
            <Nav></Nav>
            <ToastContainer />

        </div>
    )
}

export default History;