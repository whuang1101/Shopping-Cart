import { useEffect } from "react"
import "../css/home-page.css"
import myPhoto from "../assets/real-image.png"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';

function HomePage({items}) {
    return (
        <motion.div className="background"initial= {{
            opacity:0,
        }}
        animate = {{
            opacity:1
        }
        }
        transition= {{duration:1}}>
            <header>
            <motion.img
                    src={myPhoto} alt="Fashion" className="bigger-image"/>
                <div className="navigation">
                    <motion.h3  
                    whileHover={{
                        scale: 1.5,
                        color: "rgb(255,255,255)",
                        transition: { duration: .5 }
                        ,
                    }}
                    className="home" tabIndex={0}>Home</motion.h3>
                    <Link to="Store">
                        <motion.h3 whileHover={{
                            color: "rgb(255,255,255)",
                            scale: 1.5,
                            transition: { duration: .5 },
                        }}className="store" role="link">Store</motion.h3>
                    </Link>
                    <Link to="/About">
                    <motion.h3 whileHover={{
                        color: "rgb(255,255,255)",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about" role="link">About</motion.h3>
                    </Link>
                </div>
                <Link to="/checkout">
                <motion.div whileHover= {{scale:1.5}}className="shopping" role="link" aria-label="Shopping Cart">
                    <div className="icon">
                        <Icon path={mdiShopping} size={1.1} color="black" />
                    <div className="number-cart" tabIndex={0}>{items}</div>
                    </div>
                    </motion.div>
                </Link>
            </header>
            <main>
                <Link to="Store">
                <motion.button className="shop-now"
                initial={{ x: "-50%", y: "-50%" }}
                whileHover={{
                    backgroundColor: "rgb(0,0,0)",
                    border: ".2em solid black",
                    color:"rgb(255,255,255)",
                    scale:1.3,
                    textShadow: "0px 0px 1em rgb(255,255,255)",
                    x: "-50%",
                    y: "-50%",
                }}
                whileTap={{
                    backgroundColor: "rgb(0,0,0)",
                    border: ".2em solid black",
                    color:"rgb(255,255,255)",
                    scale:.8,
                    textShadow: "0px 0px 1em rgb(255,255,255)",
                    x: "-50%",
                    y: "-50%",
                }}>Shop Now</motion.button>
                </Link>
            </main>
        </motion.div>
    )
}
export default HomePage