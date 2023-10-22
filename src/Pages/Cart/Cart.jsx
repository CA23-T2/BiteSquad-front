import { useContext } from 'react';
import trash from "../../asesst/Trash.svg"
import Cookies from 'js-cookie';
function Cart (props) {
const cart = Cookies.get("cart");
console.log(cart)
    return(
        <div className="korpa">
        <h2>Narudzba #Anja002</h2>
        <div className="Helper">
            <p>Naruceno</p>
            <p>Kolicina</p>
        </div>
        <hr />
        <div className="List">
            {
                
                
        



            }
            <button>Potvrdi</button>
        </div>

    </div>
    )
}

export default Cart;