import { Box, Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import isEmail from "validator/lib/isEmail";
import { InputText } from "../components/elements/InputText";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CartProvider } from "../context/CartProvider";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const [errors, setErrors] = useState<any>();
  const nav = useNavigate();
  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};
    if (!email) errors.email = "Can nhap email vao";
    if (email && !isEmail(email)) errors.email = "Chua dung dinh dang email";
    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < 8)
      errors.password = `Can nhap password toi thieu 8 ky tu`;
    setErrors(errors);
    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length !== 0) return;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/signin",
        values
      );
      console.log("login", data);

      toast.success("🦄 Thành công !", {
        position: "top-right",
        autoClose: 5000,
      });
      nav("/");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data)); // luu object
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
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
          width: "100%",
        }}
      >
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
                Login
              </Typography>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ values }) => {
                  return (
                    <Stack gap={2}>
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
  );
};

export default Login;
