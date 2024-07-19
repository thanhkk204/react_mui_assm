import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/Loading";
import { ProductFormParams } from "../../../constants/type";
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

function AdminProductAdd() {
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/product", values);
      toast.success('🦄 Thành công !', {
        position: "top-right",
        autoClose: 5000,
      });
      nav("/dashboard/productTable");
    } catch (error:any) {
      console.log(error)
      const errorMessage = error.response.data.message ? error.response.data.message : error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledContainer>
        <Stack gap={2}>
          <StyledTypography variant="h3" textAlign={"center"}>
            Add Product
          </StyledTypography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} formTitle="Add Product" buttonColor="#007bff" />
        </Stack>
      </StyledContainer>
    </>
  );
}

export default AdminProductAdd;
