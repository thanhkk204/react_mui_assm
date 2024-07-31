import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useDemoData } from "@mui/x-data-grid-generator"
import { CheckoutType, OrderedProducType } from "../constants/type"
import { useCallback } from "react"

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"]

// Định nghĩa các cột của bạn
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 180 },
  { field: "total", headerName: "Total", width: 180 },
  { field: "createdAt", headerName: "CreatedAt", width: 180 },
]


type Props = {
    checkouts: CheckoutType[]
}

export default function CheckoutTable({checkouts}:Props) {
  // Đây là hàm để tính tổng số lượng của orderedProducts

const calculateTotalQuantity = (orderedProducts: OrderedProducType[]) => {
    return orderedProducts.reduce((total, product) => total + product.quantity, 0);
  };
const calculateTotalPrice = (orderedProducts: OrderedProducType[]) => {
    return orderedProducts.reduce((total, product) => total = product.quantity * product.product_id.price , 0);
  };
  const rows = checkouts.map(item=> 
     ({
        ...item,
         id: item._id,
         quantity: calculateTotalQuantity(item.orderedProducts),
         total: calculateTotalPrice(item.orderedProducts)
      })
  )
//   console.log('rows',rows)
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        checkboxSelection
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  )
}
