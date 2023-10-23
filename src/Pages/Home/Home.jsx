
import home from "../../asesst/home.svg"
import users from "../../asesst/2User.svg";
import trash from "../../asesst/Trash.svg"
import fire from "../../asesst/fire.svg"
import clock from "../../asesst/clock.svg"
import star from "../../asesst/star.png"
import Exit from "../../asesst/Exit.svg"
import bar from "../../asesst/bar.svg"
import burger from "../../asesst/burger.svg"
import arr from "../../asesst/arr.svg"
import history from "../../asesst/history.svg"
import cartt from "../../asesst/cart.svg"
import "./Home.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Item from "../Item/Item"
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { faClock,  } from "@fortawesome/free-regular-svg-icons";
function App(props) {
    const notify = (e) => toast.success(e, {
        position: "top-center",
    });
    const ref = useRef(null);
    useOutsideAlerter(ref);
    // Dohvati podatke iz localStorage pri inicijalizaciji komponente
    const token = Cookies.get('token');
    const crt = Cookies.get('cart');
    const Navigate = useNavigate();
    const [meals, SetMeals] = useState([]);
    const [date, Setdate] = useState();
    const [categories, SetCategories] = useState([]);
    const [cart, setCart] = useState([

    ])
    const [filter, setFilter] = useState(0)
    const [Amount, setAmount] = useState(1)
    const [FoodPopUp, setFoodPopUp] = useState(0)
    useEffect(() => {
        if (!token) {
            Navigate("/Login")
        }
    })
    useEffect(() => {

        const FetchMeals = async () => {
            await axios(Config.apiUrl+"api/meals", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    SetMeals(response.data.data[0].data)
                })
        }

        const categoiresFetch = async () => {
            await axios.get(Config.apiUrl+"api/meals/categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    SetCategories(response.data.data)
                    //console.log(response.data.data)
                })
        }
        FetchMeals();
        categoiresFetch();
    }, [token])

    const mealOrder = async () => {
        await axios.post(Config.apiUrl+"api/orders/new",
            {
                meals: cart.map(e => { return (e.id) }),
                quantities: cart.map(e => { return (e.kolicina) }),
                delivery_date: date
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
                notify(response.data);
                notify(response.data.message);
                setCart([]);
            })
    }
    //console.log(cart.some(item => item.id === 1))

    const korpa = (e) => {
        if (cart.some(item => item.id === e.id)) {
            azurirajKolicinu(e.id, e.kolicina)
        } else {
            setCart([...cart, { id: e.id, name: e.name, kolicina: e.kolicina, price: Number(e.price) * e.kolicina }]); setAmount(1); setFoodPopUp(0);
            notify("Obrok dodat u korpu");

        }

    }
    const azurirajKolicinu = (id, kolicina) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                // Pronašli smo objekt s "id" vrijednošću 1, ažuriramo količinu
                return { ...item, kolicina: item.kolicina + kolicina };
            }
            return item; // Vraćamo ostale objekte nepromijenjene
        });
        notify("Nova količina obroka dodata u korpu");

        setCart(updatedCart);
        setFoodPopUp(0) // Postavljamo ažuriranu kopiju niza kao novo stanje
    };
    const [page, setPage] = useState("home")
    let totalPrice = 0;
    const currentDate = new Date();

    // Izračunajte datum koji je 7 dana u budućnosti
    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    // Pretvorite ova dva datuma u format koji očekuje input date
    const sevenDaysFromNowFormatted = sevenDaysFromNow.toISOString().split('T')[0];


    function useOutsideAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {

                    setFoodPopUp(0);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        });
    }
    return (
        <>

            <header className="Mob">
                {page !== "home" ? <img width={10} onClick={() => { setPage("home"); setFoodPopUp(0) }} src={arr} alt="arrow" /> : <img src={bar} alt="bar" />}
                <h3>Kompanija</h3>
                <img onClick={() => Navigate("/Profile")} className="ProfImg" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="profimg" />


            </header>
            <section className="container">


                <nav>
                    <div className={page === "home" ? "active" : ""} onClick={()=>setPage("home")}>
                       <FontAwesomeIcon icon={faHome} color={page === "home" ? "white" : "#F9881F"}/>
                    </div>
                    <div>
                       <FontAwesomeIcon icon={faClock} onClick={() => Navigate("/history")} size="1x" color="#F9881F    "/>
                       
                    </div>
                    <div id="cart" className={page === "cart" ? "active" : ""}>
                       
                       <FontAwesomeIcon icon={faCartShopping} onClick={() => setPage("cart")} size="1x" color={page === "cart" ? "white" : "#F9881F"}/>


                    </div>
                    <div id="profile">
                        <img onClick={() => Navigate("/profile")} src={users} alt="" />
                        
                    </div>

                    <div id="logout">
                        <img src={Exit} onClick={() => { Cookies.remove("token"); Navigate("/Login") }} alt="" />
                    </div>
                </nav>
                <section className="Center">
                    <h2 className="MobH2">Uživajte u ukusnoj hrani</h2>
                    <div className="filter">
                        <div onClick={e => setFilter(0)} className={filter === 0 ? "active" : null}>
                            <div className="helper">
                                <img src={burger} alt="" />
                                <p>Svi</p>
                            </div>
                        </div>
                        {categories.map((item, key) => {
                            return (
                                <div key={key} onClick={e => { setFilter(item.id); }} className={filter === item.id ? "active" : null}>
                                    <div className="helper">
                                        <img src={burger} alt="" />
                                        <p>{item.name}</p>

                                    </div>

                                </div>
                            )
                        })}


                    </div>
                    <h2>Odabir jela</h2>
                    <div className="Food">

                        {
                            filter === 0 ?
                                meals.map((e, key) => {
                                    return (<div key={key} onClick={(event) => { setFoodPopUp(e.id); setPage("item") }} className="Meal">
                                        <img src={Config.apiUrl + e.image_url} alt="meal" />

                                        <h3>{e.meal_name}</h3>
                                        <p>{e.description}</p>
                                        <div className="helper">
                                            <span>Price {e.price}$</span>
                                            
                                        </div>

                                    </div>)
                                }) :
                                meals.filter(meal => meal.category_id === filter).map((e, key) => {
                                    return (<div key={key} onClick={(event) => setFoodPopUp(e.id)} className="Meal">
                                        <img src={Config.apiUrl + e.image_url} alt="meal" />
                                        <h3>{e.meal_name}</h3>
                                        <p>{e.description}</p>
                                        <div className="helper">
                                        <span>Price {e.price}$</span>

                                        </div>

                                    </div>)
                                })
                        }



                    </div>
                    {
                        window.innerWidth < 425 ? null : <><br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br /></>
                    }
                </section>
                <div className="korpa" id={page === "cart" ? "opened" : null}>
                    <h2>Korpa</h2>
                    <div className="Helper">
                        <p>Naruceno</p>
                        <p>Kolicina</p>
                    </div>
                    <hr />
                    <div className="List">
                        {
                            cart.length > 0 ? cart.map((e, key) => {
                                return (

                                    meals.filter(item => e.id === item.id).map((el, key) => {

                                        return (
                                            <div key={key} className="KorpaDiv">
                                               
                                                <img src={Config.apiUrl + el.image_url} alt="meal" />

                                                <h3>{el.meal_name}</h3>
                                                <div className="Desktop">
                                                    <span className="amount">{e.kolicina}</span>
                                                    <span className="remove" onClick={(event) => { setCart(cart.filter((el) => el.id !== e.id)); console.log(e.id) }}>
                                                        <img src={trash} alt="" />
                                                    </span>
                                                </div>
                                                <div className="Mobile">
                                                    <button onClick={() => setAmount(Amount - 1)}>-</button>
                                                    <span>{Amount}</span>
                                                    <button onClick={() => setAmount(Amount + 1)}>+</button>
                                                </div>
                                                <div className="Options">

                                                    <span className="remove" onClick={(event) => { setCart(cart.filter((el) => el.id !== e.id)); console.log(e.id) }}>
                                                        <img src={trash} alt="" />
                                                    </span>
                                                </div>
                                            </div>
                                        )


                                    })

                                )
                            }) : <><img width={100} src={require("../../asesst/emCart.png")} alt="praznaKorpa" /> <h3>Vaša korpa je trenutno prazna</h3></>



                        }



                    </div>
                    {cart.length > 0 ?
                        <div className="CartFooter">
                            <span>Total: {cart.map((e) => { totalPrice += Number(e.price) })}{totalPrice}$</span>
                            <span>Delivery date: <input type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} onChange={(e) => Setdate(e.currentTarget.value)} max={sevenDaysFromNowFormatted}></input>
                            </span>
                            <button onClick={() => mealOrder()}>Potvrdi</button>
                        </div> : null}

                </div>
            </section>
            {FoodPopUp !== 0 ?
                <div className="popup" >

                    <div ref={ref}>
                        {meals.filter((meal) => meal.id === FoodPopUp).map((e, key) => {
                            return (
                                <div key={key}>
                                    <Item key={key} img={e.image_url} korpa={korpa} id={e.id} name={e.meal_name} desc={e.description} price={e.price} karakteristike={e.dietary_restrictions} />
                                </div>
                            )
                        })}
                    </div>


                </div>
                : null}
            <ToastContainer />
        </>
    );
}

export default App;
