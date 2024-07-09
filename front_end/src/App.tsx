import { Box, Button, Container } from "@mui/material"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet, Route, Routes } from "react-router-dom"

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
    </Box>
  )
}
export default App
