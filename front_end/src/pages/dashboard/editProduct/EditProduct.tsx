import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormParams, ProductType } from "../../../constants/type";
import ProductForm from "../../../components/ProductForm";
import { toast } from "react-toastify";

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/product/${id}`);
      console.log('data',data)
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.put(`http://localhost:5000/product/${id}`, values);
      toast.success('🦄 Thành công !', {
        position: "top-right",
        autoClose: 5000,
        });
      nav("/dashboard/productTable");
    } catch (error) {}
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Edit Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={product} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductEdit;