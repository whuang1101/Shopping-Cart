import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import StorePage from "./StorePage";
import ProductPage from "./ProductPage";
import { useEffect, useState } from "react";
import CheckOut from "./CheckOut";
import AboutPage from "./AboutPage";

const Router = () => {
  const [shoppingCart, setShoppingCart] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let prevShopping = {};
    for (let i = 0; i < 20; i++) {
      const tempShop = { ...prevShopping };
      tempShop[i+1] = 0;
      prevShopping = { ...tempShop };
    }
    setShoppingCart({ ...prevShopping });
  }, []);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <HomePage items={totalItems}/>
      },
      {
        path: "/Store",
        element: <StorePage items={totalItems}/>
      },
      {
        path: "/Store/:number",
        element: <ProductPage cart={shoppingCart} setCart={setShoppingCart} items={totalItems} setItems={setTotalItems}/>
      },
      {
        path: "/Checkout",
        element: <CheckOut cart ={shoppingCart} setCart={setShoppingCart} items={totalItems} setItems={setTotalItems}/>
      },
      {
        path: "/About",
        element: <AboutPage items={totalItems}/>
      }
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;