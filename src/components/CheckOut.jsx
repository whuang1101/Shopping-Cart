import { motion, useAnimation } from "framer-motion"
import { Link } from "react-router-dom"
import "../css/product-page.css";
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';
import "../css/checkout.css"
import { useEffect, useState } from "react";
import addAllMerch from "../JS/addAllMerch"
import getTotalPrice from "../JS/getTotalPrice";
import BouncingLoadingScreen from "./BouncingScreen";
function CheckOut ({cart, setCart, items, setItems}) {
    const controls = useAnimation();
    const [allItems, setAllItems] = useState({})
    const [loading, setLoading] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const handleEnterPress = (e,doSomething) => {
        if(e.target.key == "Enter"){
            doSomething();
        }
    }
    const fetchProducts = async() => {
        const newItems = await fetch(`https://fakestoreapi.com/products/`)
        .then((res)=>{
            if(!res.ok){
                throw new Error("Network failed to connect");
            }
            return res.json()})
            .catch((error) => {
                console.error('Error:', error.message);
              });
        setAllItems(newItems);
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    }
    const onCartChange = (e, index) => {
        setCart((prevCart)=>{
            if(e.target.value !== "")
            {const newCart = {...prevCart};
            newCart[index] = parseInt(e.target.value);
            return newCart;}
            else {
                const newCart = {...prevCart};
                newCart[index] = 1;
                return newCart;
            }
        })
    }
    const onCartIncrement = (index) => {
        setCart((prevCart)=>{
            const newCart = {...prevCart};
            newCart[index] += 1;
            return newCart;
        })
    }
    const checkOutClick = () => {
        alert("You checked Out!!")
    }
    const onCartDecrement = (index) => {
        setCart((prevCart)=>{
            const newCart = {...prevCart};
            newCart[index] -= 1;
            return newCart;
        })
    }
    useEffect(()=> {
        fetchProducts();
    },[])
    useEffect(()=> {
        if (loading && Object.keys(allItems).length > 0) {
            console.log(allItems);
            setSubtotal(getTotalPrice(cart, allItems));
        }
    },[loading,cart])

    useEffect(() => {
        controls.start({
            scale: [1, 2, 1], 
            transition: { duration: 0.5 },
            rotate: [0, -10, 10, -10, 10, 0], 
            transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        })
        setItems(addAllMerch(cart));
    },[cart])
    return (
        <motion.div className="store-background" initial= {{
            opacity:0,
        }}
        animate = {{
            opacity:1
        }
        }
        transition= {{duration:1}}
        >
            <header>
                <div className="navigation">
                    <Link to="../">
                        <motion.h3  
                        whileHover={{
                            scale: 1.5,
                            color: "rgb(255,255,255)",
                            transition: { duration: .5 }
                            ,
                        }}
                    className="home">Home</motion.h3>
                    </Link>
                    <Link to="../Store">
                        <motion.h3 whileHover={{
                            color: "rgb(255,255,255)",
                            scale: 1.5,
                            transition: { duration: .5 },
                        }}className="store">Store</motion.h3>
                    </Link>
                    <Link to="/About">
                    <motion.h3 whileHover={{
                        color: "rgb(255,255,255)",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about">About</motion.h3>
                    </Link>
                </div>
                <Link to="/checkout">
                <motion.div whileHover= {{scale:1.5}} animate={controls} className="shopping">
                    <motion.div className="icon">
                    <Icon path={mdiShopping} size={1.1} color="black" />
                    <motion.div className="number-cart">{items}</motion.div>
                    </motion.div>
                    </motion.div>
                </Link>

            </header>
            <main className="shop-main ">
                <div className="main-container">
                <div className="checkout-display">
                    {items === 0 ? (<h1 className="center">There are no items in your cart!</h1>):
                    (loading &&Object.keys(cart).map((itemNumber) => {
                        const quantity = cart[itemNumber];
                        if (quantity !== 0) {
                            const index = parseInt(itemNumber);
                            return (
                                <div className="checkout-product" key={index}>
                                <div className="checkout-image">
                                    <img className="checkout-image" src={allItems[index-1].image} alt={allItems[index-1].title} />
                                </div>
                                <div className="product-checkout">
                                    <div className="checkout-title">{allItems[index-1].title}</div>
                                    <div className="checkout-price">${(allItems[index-1].price*1).toFixed(2)}</div>
                                    <div className="checkout-wanted">
                                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale:.9}} className="checkout-left"  role="button" tabIndex ={0} onClick ={()=> onCartDecrement(index)} onKeyDown={(e) => handleEnterPress(e,onCartDecrement(index))}>-</motion.div>
                                        <input className="checkout-output" type="number" value={quantity} onChange={(e)=> onCartChange(e,index)}/>
                                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale:.9}} role="button" tabIndex ={0} className="checkout-right" onClick ={()=> onCartIncrement(index)} onKeyDown={(e) => handleEnterPress(e,onCartIncrement(index))}>+</motion.div>
                                     </div>
                                </div>
                                <div className="price-quantity">
                                ${(allItems[index-1].price * quantity).toFixed(2)} 
                                </div>
                                </div>
                            );
                        }
                        return null;
                    }))}
                    {(!loading&& items!== 0)  && <BouncingLoadingScreen/>}
                    {(loading && items!== 0) && <div className="checkout">
                        <div className="subtotal">
                            <div className="subtotal-text">Subtotal:</div>
                            <div className="subtotal-price">${subtotal}</div>
                        </div>
                        <motion.button className="checkout-button"
                initial={{ x: "5%"}}
                whileHover={{
                    backgroundColor: "rgb(0,0,0)",
                    border: ".2em solid black",
                    color:"rgb(255,255,255)",
                    scale:1.1,
                    textShadow: "0px 0px 1em rgb(255,255,255)",
                }}
                whileTap={{
                    backgroundColor: "rgb(0,0,0)",
                    border: ".2em solid black",
                    color:"rgb(255,255,255)",
                    scale:.9,
                    textShadow: "0px 0px 1em rgb(255,255,255)",
                }} onClick={checkOutClick}>Check Out </motion.button>
                        </div>}
                </div>
                </div>

            </main>
        </motion.div>
    )
}
export default CheckOut