import { useEffect } from "react"
import "../css/home-page.css"
import myPhoto from "../assets/real-image.png"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';

function HomePage() {
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
                        color: "white",
                        transition: { duration: .5 }
                        ,
                    }}
                    className="home">Home</motion.h3>
                    <Link to="Store">
                        <motion.h3 whileHover={{
                            color: "white",
                            scale: 1.5,
                            transition: { duration: .5 },
                        }}className="store">Store</motion.h3>
                    </Link>
                    <motion.h3 whileHover={{
                        color: "white",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about">About</motion.h3>
                </div>
                <motion.div whileHover= {{scale:1.5}}className="shopping">
                    <div className="icon">
                    <Icon path={mdiShopping} size={1.1} />
                    <div className="number-cart">3</div>
                    </div>
                    </motion.div>
            </header>
            <main>
                <Link to="Store">
                <motion.button className="shop-now"
                initial={{ x: "-50%", y: "-50%" }}
                whileHover={{
                    backgroundColor: "black",
                    border: ".2em solid black",
                    color:"white",
                    scale:1.3,
                    textShadow: "0px 0px 1em rgb(255,255,255)",
                    x: "-50%",
                    y: "-50%",
                }}
                whileTap={{
                    backgroundColor: "black",
                    border: ".2em solid black",
                    color:"white",
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