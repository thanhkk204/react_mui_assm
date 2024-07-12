import { Box, Container, Grid, Paper } from "@mui/material";
import TableComponent from "./TableComponent";
import { ProductType } from "../../../constants/type";
import { useEffect, useState } from "react";
export default function ProductTable() {
  const [products, setProducts] = useState<ProductType[] >([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
        const fetchData = async ()=>{
          try {
            setLoading(true)
            const res = await fetch('http://localhost:5000/product',{
              method: "GET",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            const data = await res.json() as ProductType[]
            setProducts(data)
            setLoading(false)
          } catch (error) {
            console.log(error)
              alert('there are something wrong')
            setLoading(false)
          }
        }
        fetchData()
  },[])

  const handleDelete = async (_id: string)=>{

    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/product/' + _id,{
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if(!res.ok){
       return alert("Can't delete product")
      }
      // Nếu thành công thì thay đổi state để cập nhật giao diện ngay không phải refresh
      setProducts(preProduct=> [...preProduct.filter(item=> item._id != _id)] )
      setLoading(false)
    } catch (error) {
      console.log(error)
        alert('there are something wrong')
      setLoading(false)
    }

}
 
  return (
    <Container maxWidth="lg" sx={{ mt: 16}}>
      {/* Sử dụng data table trong mui để có thể thực hiện nhiều chức năng hơn 1 table bình thường như pagination, filter, sort */}
      {/* Lấy products và hàm handleDelete để tý nữa xóa sản phẩm truyền vào làm props của TableComponent*/}
      <TableComponent products={products} handleDelete={handleDelete} />

    </Container>
  )
}
