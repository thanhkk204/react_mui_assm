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
import "react-toastify/dist/ReactToastify.css";
import ProtectRouter from "../pages/Protected";
import CheckoutPage from "../components/Checkout";
import Checkouts from "../pages/dashboard/Checkouts";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <App />
      </ProtectRouter>
    ),
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
        path: '/checkout',
        element: <CheckoutPage />,
      }
    ],
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRouter>
        <Dashboard />
      </ProtectRouter>
    ),
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
      {
        path: "checkouts",
        element: <Checkouts />,
      },
    ],
  },
]);

export default router;
