
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
import Nav from "../../Nav";
import Item from "../Item/Item"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../../config";
function App(props) {
    const notify = (e) => toast.success(e, {
        position: "top-center",
    });
    const ref = useRef(null);
    useOutsideAlerter(ref);
    // Dohvati podatke iz localStorage pri inicijalizaciji komponente
    const [startDate, setStartDate] = useState(new Date());
    const token = Cookies.get('token');
    const crt = Cookies.get('cart');
    console.log(crt)
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
            await axios("http://4.232.160.128/api/meals", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data.data)
                    SetMeals(response.data.data[0].data)
                })
        }

        const categoiresFetch = async () => {
            await axios.get("http://4.232.160.128/api/meals/categories", {
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
        await axios.post("http://4.232.160.128/api/orders/new",
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
                console.log(response);
                notify("Poružbina uspješno poslata");
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
    console.log(cart);
    let totalPrice = 0;
    const currentDate = new Date();

    // Izračunajte datum koji je 7 dana u budućnosti
    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    // Pretvorite ova dva datuma u format koji očekuje input date
    const currentDateFormatted = currentDate.toISOString().split('T')[0];
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
                {page != "home" ? <img width={10} onClick={() => { setPage("home"); setFoodPopUp(0) }} src={arr} alt="" /> : <img src={bar} alt="" />}
                <h3>Kompanija</h3>
                <img onClick={() => Navigate("/Profile")} className="ProfImg" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" />


            </header>
            <section className="container">


                <nav>
                    <div className="active">
                        <img src={home} alt="" />
                    </div>
                    <div>
                        <img src={history} onClick={() => Navigate("/history")} alt="" />
                    </div>
                    <div>
                        <img src={cartt} onClick={() => setPage("cart")} alt="" />
                    </div>
                    <div>
                        <img onClick={() => Navigate("/profile")} src={users} alt="" />
                    </div>
                    <div>
                        <img src={settings} alt="" />
                    </div>
                    <div id="logout">
                        <img src={Exit} onClick={() => { Cookies.remove("token"); Navigate("/Login") }} alt="" />
                    </div>
                </nav>
                <section className="Center">
                    <h2 class="MobH2">Uživajte u ukusnoj hrani</h2>
                    <div className="filter">
                        <div onClick={e => setFilter(0)} className={filter === 0 ? "active" : null}>
                            <div className="helper">
                                <img src={burger} alt="" />
                                <p>Svi</p>
                            </div>
                        </div>
                        {categories.map(item => {
                            return (
                                <div onClick={e => { setFilter(item.id); }} className={filter === item.id ? "active" : null}>
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
                                meals.map((e) => {
                                    return (<div onClick={(event) => { setFoodPopUp(e.id); setPage("item") }} className="Meal">
                                        <img src={require("../../asesst/burger.png")} alt="" />
                                        <h3>{e.meal_name}</h3>
                                        <p>{e.description}</p>
                                        <div className="helper">
                                            <span><img src={star} alt="" /> 4+</span>
                                            <span><img src={fire} alt="" /> 300kcal</span>
                                            <span><img src={clock} alt="" /> 35min</span>
                                        </div>

                                    </div>)
                                }) :
                                meals.filter(meal => meal.category_id === filter).map((e) => {
                                    return (<div onClick={(event) => setFoodPopUp(e.id)} className="Meal">
                                        <img src={Config.apiUrl + e.image_url} alt="" />
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
                            cart.length > 0 ? cart.map(e => {
                                return (

                                    meals.filter(item => e.id === item.id).map(el => {

                                        return (
                                            <div>
                                                <img src={require("../../asesst/pizza.png")} alt="" />

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
                            }) : <><img width={100} src={require("../../asesst/emCart.png")} /> <h3>Vaša korpa je trenutno prazna</h3></>



                        }



                    </div>
                    {cart.length > 0 ?
                        <div className="CartFooter">
                            <span>Total: {cart.map(e => { totalPrice += Number(e.price) })}{totalPrice}$</span>
                            <span>Delivery date: <input type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} onChange={(e) => Setdate(e.currentTarget.value)} max={sevenDaysFromNowFormatted}></input>
                            </span>
                            <button onClick={() => mealOrder()}>Potvrdi</button>
                        </div> : null}

                </div>
            </section>
            {FoodPopUp !== 0 ?
                <div className="popup" >

                    <div ref={ref}>
                        {meals.filter(meal => meal.id === FoodPopUp).map(e => {
                            return (
                                <>
                                    <Item korpa={korpa} id={e.id} name={e.meal_name} desc={e.description} price={e.price} />
                                </>
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
