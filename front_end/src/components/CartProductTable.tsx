import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useCart } from "../context/CartProvider"
import { Box, Button, Typography } from "@mui/material"
import { Image } from "@mui/icons-material"

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
]

export default function CartProductTable() {
  const { cart, updateQuantity, removeItem } = useCart()

  const handleMinus = (_id: string, quantity: number) => {
    if (quantity < 1) return
    updateQuantity(_id, quantity)
  }
  const handlePlus = (_id: string, quantity: number) => {
    updateQuantity(_id, quantity)
  }
  const total = cart.reduce((sum, item)=>{
       return sum += item.quantity * item.price
  },0)
  return (
    <TableContainer onClick={(e) => e.stopPropagation()} component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="caption table">
        <caption >
          <div style={{width: '100%', textAlign: 'end'}}>
        <div>Tổng</div>
        <p>{total}</p>

          </div>
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((orderedPro) => (
            <TableRow key={orderedPro._id}>
              <TableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={orderedPro.image}
                      alt={orderedPro.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography>{orderedPro.title}</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">{orderedPro.price}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(),
                        handleMinus(orderedPro._id, orderedPro.quantity - 1)
                    }}
                    style={{
                      width: "26px",
                      height: "26px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "19px",
                    }}
                  >
                    -
                  </button>
                  {orderedPro.quantity}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(),
                        handlePlus(orderedPro._id, orderedPro.quantity + 1)
                    }}
                    style={{
                      width: "26px",
                      height: "26px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "19px",
                    }}
                  >
                    +
                  </button>
                </Box>
              </TableCell>
              <TableCell align="right">
                {orderedPro.price * orderedPro.quantity}
              </TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <div onClick={() => removeItem(orderedPro._id)}>X</div>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
