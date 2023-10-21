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

import "./Home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function App() {
    const token = Cookies.get('token');
    const Navigate = useNavigate();
    const [meals, SetMeals] = useState([]);
    const [categories, SetCategories] = useState([]);
    const [cart, setCart] = useState([
        {
            id: 1,
            kolicina: 1,
        },
        {
            id: 2,
            kolicina: 1,
        },
    ])
    const [filter, setFilter] = useState(0)
    useEffect(() => {
        if (token === null) {
            Navigate("/Login")
        }
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

        const categoiresFetch = async () => {
            await axios.get("http://4.232.160.128/api/meals/categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    SetCategories(response.data.data)
                    console.log(response.data.data)
                })
        }
        FetchMeals();
        categoiresFetch();
    }, [])
    console.log(cart)
    const mealOrder = async () => {
        await axios.post("http://4.232.160.128/api/orders/new",
            {
                meals: cart.map(e => { return (e.id) }),
                quantities: cart.map(e => { return (e.kolicina) }),
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
    console.log(cart.some(item => item.id === 1))


    const azurirajKolicinu = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                // Pronašli smo objekt s "id" vrijednošću 1, ažuriramo količinu
                return { ...item, kolicina: item.kolicina + 1 };
            }
            return item; // Vraćamo ostale objekte nepromijenjene
        });

        setCart(updatedCart); // Postavljamo ažuriranu kopiju niza kao novo stanje
    };

    return (
        <>
            <header>
                <img src={BiteSquad} alt="" />
                <div id="search">
                    <input type="text" name="" id="" placeholder="Pretrazi hranu" />
                </div>
            </header>
            <header className="Mob">
                <img src={bar} alt="" />
                <h3>Home</h3>
                <img src={bar} alt="" />

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
                    <div id="logout" onClick={() => { Cookies.remove("token"); Navigate("/Login") }}>
                        <img src={Exit} alt="" />
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
                                    return (<div onClick={(event) => { cart.some(item => item.id === e.id) ? azurirajKolicinu(e.id) : setCart([...cart, { id: e.id, kolicina: 1 }]) }} className="Meal">
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
                                    return (<div onClick={(event) => { setCart([...cart, e.id]); console.log(e.id) }} className="Meal">
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
                    {
                        window.innerWidth < 425 ? null :<><br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br /></>
                    }
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
                            cart.map(e => {
                                return (
                                    meals.filter(item => e.id === item.id).map(el => {

                                        return (
                                            <div>
                                                <img src={require("../../asesst/pizza.png")} alt="" />

                                                <h3>{el.meal_name}</h3>

                                                <span className="amount">{e.kolicina}</span>
                                                <span className="remove" onClick={(event) => { setCart(cart.filter((el) => el.id !== e.id)); console.log(e.id) }}>
                                                    <img src={trash} alt="" />
                                                </span>
                                            </div>
                                        )


                                    })
                                )
                            })



                        }



                        <button onClick={() => mealOrder()}>Potvrdi</button>
                    </div>

                </div>
            </section>
            <div className="popup">
                <div className="FoodPopUp">

                </div>
            </div>
        </>
    );
}

export default App;
