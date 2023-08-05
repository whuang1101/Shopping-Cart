import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import "../css/product-page.css";
import Icon from '@mdi/react';
import { mdiShopping } from '@mdi/js';

function AboutPage ({items}) {

        return (<motion.div className="store-background" initial= {{
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
                    <Link to="/About">
                    <motion.h3 whileHover={{
                        color: "rgb(255,255,255)",
                        scale: 1.5,
                        transition: { duration: .5 },
                    }}className="about">About</motion.h3>
                    </Link>
                </div>
                <Link to="/checkout">
                    <motion.div whileHover= {{scale:1.5}}className="shopping" aria-label="Shopping Cart">
                        <motion.div className="icon">
                        <Icon path={mdiShopping} size={1.1} color="black" />
                        <motion.div className="number-cart">{items}</motion.div>
                        </motion.div>
                    </motion.div>
                </Link>
        </header>
        <main>
            <div className="main-container">
                <div className="about-display">
                    This Project was made while completing the Odin Project's Java Script course. Feel free to view on any device! To checkout the code for this project visit the creators github. <a className="git-hub"href="https://github.com/whuang1101/Shopping-Cart">whuang1101</a>
                </div>
            </div>
        </main>
        </motion.div>
        )
}

export default AboutPage