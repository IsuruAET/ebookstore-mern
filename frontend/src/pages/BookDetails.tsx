import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../features/authSlice";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookQuery(id || "");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const handlePurchase = () => {
    // TODO: Implement purchase functionality
    console.log("Purchasing book:", book);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading book details</Typography>;
  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={book.coverImage || "https://via.placeholder.com/300"}
              alt={book.title}
              sx={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${book.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Author: {book.author}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Published: {new Date(book.publishedDate).toLocaleDateString()}
            </Typography>
            <Box sx={{ mt: 3 }}>
              {isAuthenticated ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePurchase}
                    sx={{ mr: 2 }}
                  >
                    Purchase Now
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Logged in as: {currentUser?.name || "Unknown User"}
                  </Typography>
                </>
              ) : (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Please login to purchase this book
                </Alert>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails;
