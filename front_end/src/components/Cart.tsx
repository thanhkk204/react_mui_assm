import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CartProductTable from "./CartProductTable";
import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Cart() {
  const { cart } = useCart();
  const quantity = cart.orderedProduct.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 650,
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h3" sx={{ width: "100%", textAlign: "center" }}>
        Cart
      </Typography>
      <Divider />
      <Box sx={{ paddingY: 2 }}>
        <CartProductTable />
        <Link to="/checkout" style={{width: '100%'}}>
          <Button variant="contained" sx={{
            my: 2,
            width: '100%',
            py:2
          }} color="success">
            Checkout
          </Button>
        </Link>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => ( */}
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <Box sx={{ position: "relative" }}>
            <ShoppingCartIcon />
            <Box
              sx={{
                width: "15px",
                height: "15px",
                borderRadius: "100%",
                backgroundColor: "red",
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translate(-80%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                {quantity}
              </Typography>
            </Box>
          </Box>
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
