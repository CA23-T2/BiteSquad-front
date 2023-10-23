
import fire from "../../asesst/fire.svg"
import clock from "../../asesst/clock.svg"
import star from "../../asesst/star.png"
import "../Home/Home.scss";
import "./Item.scss";
import { useState } from "react";
import Config from "../../config";
function Item(props) {
    const [Amount, setAmount] = useState(1)
    return (

        <div className="FoodPopUp">
            <img src={Config.apiUrl + props.img} alt="meal" />

            <div className="AmountBtn">
                <button onClick={() => setAmount(Amount - 1)}>-</button>
                <span>{Amount}</span>
                <button onClick={() => setAmount(Amount + 1)}>+</button>
            </div>
            <h2>{props.name}</h2>
            <div className="helper">
                <span>Cijena: {props.price}$</span>
                
            </div>
            <p>{props.desc}</p>
            <span>
            
            <p>Karakteristike:  {props.karakteristike}</p>
            </span>
       
            <button className="potvrdi" onClick={(e) => { props.korpa({ id: props.id, name: props.meal_name, kolicina: Amount, price: props.price }); }}>Dodaj u korpu</button>
        </div>
    )
}
export default Item;