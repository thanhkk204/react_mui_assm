import { Box, Container } from "@mui/material"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"


import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Box
    sx={{
      backgroundColor: theme => theme.palette.background.default,
      minHeight: '100vh',
      width: '100%',
    }}
    >
      {/* Header */}
      <Header />
      <Box 
      sx={{
        position: 'relative',
        zIndex: 50
      }}
      >
      <Container 
      maxWidth="lg"
      sx={{
        mt: '150px',
      }}>
        <Outlet/>
      </Container>
      </Box>
      {/* Footer */}
      <Footer/>
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
  )
}
export default App
