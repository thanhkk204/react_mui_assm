import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardIndex from "../pages/dashboard/DashboardIndex/DashboardIndex";
import ProductTable from "../pages/dashboard/ProductTable/ProductTable";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminProductEdit from "../pages/dashboard/editProduct/EditProduct";
import AdminProductAdd from "../pages/dashboard/createProduct/CreateProComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/productDetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "signin",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardIndex />,
      },
      {
        path: "productTable",
        element: <ProductTable />,
      },
      {
        path: "createProduct",
        element: <AdminProductAdd />,
      },
      {
        path: "editProduct/:id",
        element: <AdminProductEdit />,
      },
    ],
  },
]);

export default router;
