import {
    createBrowserRouter,
  } from "react-router-dom"
import App from "../App";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardIndex from "../pages/dashboard/DashboardIndex/DashboardIndex";
import ProductTable from "../pages/dashboard/ProductTable/ProductTable";

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
      children: [
        {
          path: "",
          element: <DashboardIndex />,
        },
        {
          path: "productTable",
          element: <ProductTable />,
        },
      ]
    },
  ]);

  export default router