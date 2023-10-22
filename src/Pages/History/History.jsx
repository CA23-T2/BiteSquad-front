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
        await axios.post(Config.apiUrl + "api/meals/"+mealToRate+"/ratings/new", {
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
            <div className="Narudzbe">
                {
                    orders.map((e, key) => {
                        return (
                            <div className="Narudzba" key={key} onClick={() => setActive(e.id)} id={e.id === activeOrder ? "opened" : ""} >
                                <div className="Help">
                                    <h2>Narudžba #{e.id}</h2>
                                    <span>
                                        <h2>Datum porucivanja</h2>
                                        <p>{e.created_at}</p>
                                    </span>
                                    <span className="Status">{e.status}</span>
                                    <img id="arrow" src={arrow} alt="" />
                                </div>

                                <span>
                                    {e.meals.map((e, key) => {
                                        return (
                                            <div className="Meal">
                                                <img src={require("../../asesst/burger.png")} alt="" />
                                                <h3>{e.meal_name}</h3>
                                                <span onClick={() => setMeal(e.id)}>Ocijeni</span>

                                                <span>{e.quantity}</span>
                                                <p>{e.price}$</p>
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
            {mealToRate!== 0 ? 
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
     <input type="text" onChange={(e) => setfeedback(e.currentTarget.value)} placeholder="Upisi komentar"/>
     <button onClick={() => rateMeal()}>Ocijeni</button>
 </div>
</div>
:null}
        </div>
    )
}

export default History;