import {
    createBrowserRouter,
  } from "react-router-dom"
import App from "../App";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/Dashboard";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/productDetail/:id",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
  ]);

  export default router