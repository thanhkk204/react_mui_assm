import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/rootRouter.tsx";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./themeConfig/theme.ts";
import { LoadingProvider } from "./context/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
