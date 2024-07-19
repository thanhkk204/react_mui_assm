import { Box, Container, Grid, Paper } from "@mui/material";
import TableComponent from "./TableComponent";
import { ProductType } from "../../../constants/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductTable() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/product", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = (await res.json()) as ProductType[];
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("there are something wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/product/" + _id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return toast.error("🦄 Thất bại!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      toast.success("🦄 Thành công !", {
        position: "top-right",
        autoClose: 5000,
      });
      setProducts((preProduct) => [
        ...preProduct.filter((item) => item._id !== _id),
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("there are something wrong");
      setLoading(false);
    }
  };

  const handleEdit = (_id: string) => {
    navigate(`/dashboard/editProduct/${_id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 16 }}>
      <TableComponent
        products={products}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}
