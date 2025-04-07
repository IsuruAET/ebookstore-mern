import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
