import { Box, Container, Grid, Paper } from "@mui/material";
import TableComponent from "./TableComponent";
export default function ProductTable() {
  return (
    <Container maxWidth="lg" sx={{ mt: 16}}>
      <TableComponent />
    </Container>
  )
}
