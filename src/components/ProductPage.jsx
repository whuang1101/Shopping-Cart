import { motion,useAnimation } from "framer-motion";
import myPhoto from "../assets/real-image.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/product-page.css";
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';
import addAllMerch from "../JS/addAllMerch";
import BouncingLoadingScreen from "./BouncingScreen";

function ProductPage ({cart, setCart, items, setItems}) {
    const { number } = useParams()
    const [oneItem, setOneItem] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [loading,setLoading] = useState(true);
    const controls = useAnimation();
    const [added, setAdded] = useState(true);
    const fetchProducts = async() => {
        const items = await fetch(`https://fakestoreapi.com/products/${number}`)
            .then(res=>res.json())
            .then(json=> json);
        const tempItem = {title: items.title, image: items.image, price:items.price, description: items.description}
        setOneItem(tempItem)

    }
    const handleIncrement = () => {
        setQuantity(quantity+1)
    }
    const handleDecrement = () => {
        if(quantity > 0){
            setQuantity(quantity-1)
        }
    }
    const handleAdded = () => {
        setAdded(false);
        setTimeout(() => {
          setAdded(true);
        }, 1500);    
    }
    const addToCart = () => {
        setCart((cart) => {
            const tempCart = {...cart};
            tempCart[number] += quantity;
            return tempCart; 
        })
        handleAdded();
    }
    useEffect(() => {
        fetchProducts();
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[])
    useEffect(() => {
        setItems(addAllMerch(cart))
    },[cart])
    useEffect(() => {
        controls.start({
            scale: [1, 2, 1], 
            transition: { duration: 0.5 },
            rotate: [0, -10, 10, -10, 10, 0], 
            transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        });
      }, [items, controls]);

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
        <header className="product-margin">
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
                    <motion.h3 whileHover={{
                        color: "rgb(255,255,255)",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about">About</motion.h3>
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
        <main className="shop-main">
        <div className="main-container">
            {loading ? (
            <BouncingLoadingScreen />
            ) : (
            <>
                <div className="product-display">
                <div className="image">
                    <img className="one-image" src={oneItem.image} alt={oneItem.title} />
                </div>
                <div className="description">
                    <h2 className="item-title">{oneItem.title}</h2>
                    <p className="item-price">${oneItem.price}</p>
                    <div className="item-description">
                    <p className="description-title">Description</p>
                    <p className="actual-description">{oneItem.description}</p>
                    </div>
                    <div className="amount-wanted">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="decrement" onClick={handleDecrement} role="button" tabIndex={0}>-</motion.div>
                    <input className="text-output" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} />
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} role="button" tabIndex={0} className="increment" onClick={handleIncrement}>+</motion.div>
                    </div>
                    {added ?
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 1)", color: "rgb(255, 255, 255)" }} whileTap={{ scale: 0.9 }} className="add-item" onClick={addToCart}>Add To Cart</motion.div>
                    :
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 1)", color: "rgb(255, 255, 255)" }} whileTap={{ scale: 0.9 }} className="add-item">Added!</motion.div>

                    }
                    </div>
                </div>
            </>
            )}
        </div>
        </main>
        </motion.div>
    ) 
}
export default ProductPage