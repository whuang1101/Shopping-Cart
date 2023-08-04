import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import StorePage from "./StorePage";
import ProductPage from "./ProductPage";
import { useEffect, useState } from "react";



const Router = () => {
  const [shoppingCart, setShoppingCart] = useState({});
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
        element: <HomePage />
      },
      {
        path: "/Store",
        element: <StorePage />
      },
      {
        path: "/Store/:number",
        element: <ProductPage cart={shoppingCart} setCart={setShoppingCart}/>
      },
      {
        path: "/checkout",
      }
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;