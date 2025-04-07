import { Container, Typography, Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard. Here you can manage users, books, and
          other administrative tasks.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
