import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormParams, ProductType } from "../../../constants/type";
import ProductForm from "../../../components/ProductForm";
import { toast } from "react-toastify";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  marginTop: '4rem', 
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  maxWidth: '600px', 
  marginLeft: 'auto',
  marginRight: 'auto',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '1rem',
  borderBottom: '2px solid #ddd',
  paddingBottom: '0.5rem',
});

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/product/${id}`);
      console.log('data', data);
      setProduct({ ...data, categoryId: data.categoryId?._id });
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
    } catch (error: any) {
      const errorMessage = error.response.data.message ? error.response.data.message : error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <StyledContainer>
        <Stack gap={2}>
          <StyledTypography variant="h3" textAlign={"center"}>
            Edit Product
          </StyledTypography>
          <ProductForm onSubmit={onSubmit} initialValues={product} formTitle="Edit Product" buttonColor="#28a745" />
        </Stack>
      </StyledContainer>
    </>
  );
}

export default AdminProductEdit;
