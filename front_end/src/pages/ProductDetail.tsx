import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductType } from "../constants/type";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartProvider";

export default function ProductDetail() {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  let { id } = useParams();
  const { cart, updateQuantity,  } = useCart();
  console.log("productDetail", product);
  if (!id) return;
  const handleCick = () => {
    setLoading(!loading);
  };
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch("http://localhost:5000/product/" + id, {
            method: "GET",
          });
          const data = (await res.json()) as ProductType;
          setProduct(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          alert("there are something wrong");
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleMinus = (quantity: number) => {
    if (quantity < 1) return;
    setQuantity(quantity);
  };
  const handlePlus = (quantity: number) => {
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    const orderedPro = cart.find((item) => item._id === id);
    if (orderedPro) {
      updateQuantity(id, orderedPro.quantity + quantity);
    } else if (product) {
      addItem({
        _id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
      });
    }
  };
  return (
    <>
      {loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {product && !loading && (
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            {/* Image container */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={12}>
                <Box
                  sx={{
                    maxWidth: "100%",
                    height: "100%",
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: "10px",
                    boxShadow: (theme) => theme.shadows[15],
                  }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    src={product.image}
                    alt=""
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: {
                      xs: "50%",
                      md: "100px",
                    },
                    maxHeight: {
                      xs: "50%",
                      md: "100px",
                    },
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: (theme) => theme.shadows[5],
                    borderRadius: "10px",
                    transition: (theme) =>
                      theme.transitions.create(["transform"], {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    src={product.image}
                    alt=""
                  />
                </Box>
                <Box
                  sx={{
                    maxWidth: {
                      xs: "50%",
                      md: "100px",
                    },
                    maxHeight: {
                      xs: "50%",
                      md: "100px",
                    },
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: (theme) => theme.shadows[5],
                    borderRadius: "10px",
                    transition: (theme) =>
                      theme.transitions.create(["transform"], {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    src={product.image}
                    alt=""
                  />
                </Box>
                <Box
                  sx={{
                    maxWidth: {
                      xs: "50%",
                      md: "100px",
                    },
                    maxHeight: {
                      xs: "50%",
                      md: "100px",
                    },
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: (theme) => theme.shadows[5],
                    borderRadius: "10px",
                    transition: (theme) =>
                      theme.transitions.create(["transform"], {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    src={product.image}
                    alt=""
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="h4">{product.title}</Typography>
              <Typography variant="caption">{product.description}</Typography>

              <Box component={"p"} sx={{ py: { sx: "0.1rem", md: "0.3rem" } }}>
                <Rating name="size-medium" defaultValue={product.rating} />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "20px",
                  color: (theme) => theme.palette.error.light,
                }}
              >
                {product.price}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  backgroundColor: "#ddd1be",
                  color: (theme) => theme.palette.error.main,
                  px: 1,
                  mt: 1,
                }}
              >
                Special offer 20% off on Category
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", py: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "20px",
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  Màu:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
                >
                  <Box
                    component={"span"}
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                      backgroundColor: (theme) => theme.palette.success.main,
                      cursor: "pointer",
                      border: (theme) =>
                        `2px solid ${theme.palette.text.primary}`,
                    }}
                  ></Box>
                  <Box
                    component={"span"}
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                      backgroundColor: (theme) => theme.palette.info.main,
                      cursor: "pointer",
                    }}
                  ></Box>
                  <Box
                    component={"span"}
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                      backgroundColor: (theme) => theme.palette.warning.main,
                      cursor: "pointer",
                    }}
                  ></Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", py: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "20px",
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  Kích thước:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
                >
                  <Box
                    component={"button"}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: "5px",
                      backgroundColor: (theme) => theme.palette.error.light,
                      color: "white",
                      border: (theme) =>
                        `2px solid ${theme.palette.text.primary}`,
                      cursor: "pointer",
                    }}
                  >
                    S
                  </Box>

                  <Box
                    component={"button"}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: "5px",
                      border: (theme) =>
                        `2px solid ${theme.palette.text.primary}`,
                      cursor: "pointer",
                    }}
                  >
                    Lg
                  </Box>

                  <Box
                    component={"button"}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: "5px",
                      border: (theme) =>
                        `2px solid ${theme.palette.text.primary}`,
                      cursor: "pointer",
                    }}
                  >
                    Xl
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", py: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "20px",
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  Số lượng:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(), handleMinus(quantity - 1);
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
                  {quantity}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(), handlePlus(quantity + 1);
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
              </Box>

              <Box
                sx={{
                  width: "100%",
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{ width: { xs: "100%", md: "50%" } }}
                >
                  Mua hàng
                </Button>
                <Button
                  onClick={() => handleAddToCart()}
                  variant="outlined"
                  size="large"
                  color="error"
                  sx={{ width: { xs: "100%", md: "50%" } }}
                >
                  Thêm vào giỏ
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
