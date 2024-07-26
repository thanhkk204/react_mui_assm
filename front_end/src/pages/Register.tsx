import { Box, Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { InputText } from "../components/elements/InputText";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartProvider";
import Header from "../components/Header";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [errors, setErrors] = useState<any>();
  const nav = useNavigate();
  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};
    if (!username) errors.username = "Can nhap username vao";
    if (!email) errors.email = "Can nhap email vao";
    if (email && !isEmail(email)) errors.email = "Chua dung dinh dang email";
    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < 8)
      errors.password = `Can nhap password toi thieu 8 ky tu`;
    setErrors(errors);
    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length !== 0) return;
    try {
      await axios.post("http://localhost:5000/auth/signup", data);
      toast.success("🦄 Thành công !", {
        position: "top-right",
        autoClose: 5000,
      });
      nav("/signin");
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response.data.message
        ? error.response.data.message
        : error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <CartProvider>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Header */}
        <Header />
        <Box
          sx={{
            position: "relative",
            zIndex: 50,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              mt: "150px",
            }}
          >
            <Container>
              <Typography variant="h2" textAlign={"center"} mb={2}>
                Register
              </Typography>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ values }) => {
                  return (
                    <Stack gap={2}>
                      <Field
                        name="username"
                        render={({ input, meta }) => (
                          <InputText
                            input={input}
                            label={"Username"}
                            messageError={meta.touched && meta.error}
                          />
                        )}
                      />
                      <Field
                        name="email"
                        render={({ input, meta }) => (
                          <InputText
                            input={input}
                            label={"Email"}
                            messageError={meta.touched && meta.error}
                          />
                        )}
                      />
                      <Field
                        name="password"
                        render={({ input, meta }) => (
                          <InputText
                            input={input}
                            label={"Password"}
                            messageError={meta.touched && meta.error}
                            type="password"
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        onClick={() => onSubmit(values)}
                      >
                        Submit
                      </Button>
                    </Stack>
                  );
                }}
              />
            </Container>
          </Container>
        </Box>
        {/* Footer */}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Box>
    </CartProvider>
  );
};

export default Register;
