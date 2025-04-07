import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useGetBooksQuery } from "../features/apiSlice";
import { useNavigate } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
}

const Home = () => {
  const { data: books, isLoading, error } = useGetBooksQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading books</Typography>;

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Featured Books
      </Typography>
      <Grid container spacing={4}>
        {books?.map((book: Book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={book.coverImage || "https://via.placeholder.com/200"}
                alt={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${book.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
