import "../css/store-background.css"
import myPhoto from "../assets/real-image.png"
import { motion, useTime } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';
function StorePage ({items}) {
    const [allItems, setAllItems] = useState([])
    const item = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const [loading, setLoading] = useState(true);

    const fetchProducts = async() => {
        const items = await fetch('https://fakestoreapi.com/products')
            .then((res)=>{
                if(!res.ok){
                    throw new Error("Network failed to connect");
                }
                return res.json()})
                .catch((error) => {
                    console.error('Error:', error.message);
                  });
            setAllItems(items)
        setLoading(false);
    }
    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 2000);
    },[])
    // useEffect(() => {
    //     console.log(allItems); 
    //   }, [allItems]);
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
            <header className="bottom-border">
                <div className="navigation">
                    <Link to="/">
                        <motion.h3  
                        whileHover={{
                            scale: 1.5,
                            color: "rgb(255,255,255)",
                            transition: { duration: .5 }
                            ,
                        }}
                        className="home">Home</motion.h3>
                    </Link>
                        <motion.h3 whileHover={{
                            color: "rgb(255,255,255)",
                            scale: 1.5,
                            transition: { duration: .5 },
                        }}className="store">Store</motion.h3>
                    <Link to="/About">
                    <motion.h3 whileHover={{
                        color: "rgb(255,255,255)",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about">About</motion.h3>
                    </Link>
                </div>
                <Link to="/checkout">
                <motion.div whileHover= {{scale:1.5}}className="shopping">
                    <div className="icon">
                    <Icon path={mdiShopping} size={1.1} color="black" />
                    <div className="number-cart">{items}</div>
                    </div>
                    </motion.div>
                </Link>
            </header>
            <main className="shop-main">
                <div className="main-container">
                    <div className="shopping-view">
                        {!loading ?
                         allItems.map((data, index) => (
                            <Link to={`${data.id}`} key={data.id} >
                            <motion.div className="shop-item" whileHover={{
                                boxShadow: "0 0 1em .5em black"
                            }}>
                                <div className="product-image">
                                    <motion.img className="product-img" whileHover = {{
                                        scale: 1.2,
                                    }}src={data.image} alt={data.title} />
                                </div>
                                <div className="product-title"> {data.title} </div>
                                <div className="price">$ {(data.price).toFixed(2)}</div>
                            </motion.div>
                            </Link>
                        )):
                        item.map((hi) => (
                            <motion.div className="loading-item" key={hi} >
                            </motion.div>
                        ))}

                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default StorePage