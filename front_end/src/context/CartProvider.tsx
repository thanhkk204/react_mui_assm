"use client";
import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { CartItem } from "../constants/type";

type AddToCarytType = {
  product_id: string;
  quantity: number;
};
type UpdateCartType = {
  _id: string;
  quantity: number;
};
interface CartContextProps {
  cart: CartItem;
  setCart: (cartItem: CartItem) => void;
  userID: string;
  addProductToCart: (item: AddToCarytType) => void;
  updateQuantity: (product: UpdateCartType) => void;
  removeItem: (_id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("user");
  if (!user) throw new Error("Can't find user in localstorage");
  const userID = JSON.parse(user)._id;

  const [cart, setCart] = useState<CartItem>({
    _id: "",
    userId: userID,
    orderedProduct: [],
  });

  const getCart = async () => {
    const res = await fetch("http://localhost:5000/cart/" + userID, {
      method: "GET",
    });
    const data = await res.json();
    if (data.cart) {
      setCart(data.cart);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  

  const addProductToCart = async (item: AddToCarytType) => {
    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userID,
        cartId: cart._id,
        orderedDetails: item,
      }),
    });
    const data = await res.json();
    if (data.cart) {
      setCart(data.cart);
    }
  };

  const removeItem = async (_id: string) => {
    const res = await fetch("http://localhost:5000/cart/" + _id, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.cart) {
      setCart(data.cart);
    }
  };

  const updateQuantity = async (product: UpdateCartType) => {
    const res = await fetch("http://localhost:5000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userID,
        cartId: cart._id,
        orderedDetails: product,
      }),
    });
    const data = await res.json();
    if (data.cart) {
      setCart(data.cart);
    }
  };
  return (
    <CartContext.Provider value={{ cart,setCart ,userID, addProductToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
