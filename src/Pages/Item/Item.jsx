
import fire from "../../asesst/fire.svg"
import clock from "../../asesst/clock.svg"
import star from "../../asesst/star.png"
import Exit from "../../asesst/Exit.svg"
import bar from "../../asesst/bar.svg"
import burger from "../../asesst/burger.svg"

import "../Home/Home.scss";
import "./Item.scss";
import axios from "axios";
import { useEffect, useState, useContext,createContext } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart"


function Item(props) {
 
    const token = Cookies.get('token');
    const Navigate = useNavigate();
    const [meals, SetMeals] = useState([]);
    const [categories, SetCategories] = useState([]);
    const [cart, setCart] = useState([
     
    ])
    const [filter, setFilter] = useState(0)
    const [Amount, setAmount] = useState(1)
   

    return (
    
        <div className="FoodPopUp">
            <img src={require("../../asesst/burger.png")} alt="" />
            <div className="AmountBtn">
                <button onClick={() => setAmount(Amount - 1)}>-</button>
                <span>{Amount}</span>
                <button onClick={() => setAmount(Amount + 1)}>+</button>
            </div>
            <h2>{props.name}</h2>
            <div className="helper">
                <span><img src={star} alt="" /> 4+</span>
                <span><img src={fire} alt="" /> 300kcal</span>
                <span><img src={clock} alt="" /> 35min</span>
            </div>
            <p>{props.desc}</p>
            <button className="potvrdi" onClick={(e) => {props.korpa({id: props.id, name: props.meal_name, kolicina: Amount, price:props.price});  }}>Dodaj u korpu</button>

            
            
        </div>
    )
}
export default Item;