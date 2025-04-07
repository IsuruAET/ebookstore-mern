import { useForm } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

interface UploadBookForm {
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: File | null;
  pdfFile: File | null;
}

const UploadBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UploadBookForm>();

  const onDropCover = (acceptedFiles: File[]) => {
    setValue("coverImage", acceptedFiles[0]);
  };

  const onDropPdf = (acceptedFiles: File[]) => {
    setValue("pdfFile", acceptedFiles[0]);
  };

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      onDrop: onDropCover,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  const { getRootProps: getPdfRootProps, getInputProps: getPdfInputProps } =
    useDropzone({
      onDrop: onDropPdf,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
    });

  const onSubmit = (data: UploadBookForm) => {
    console.log("Book data:", data);
    // Handle book upload logic here
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Upload New Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                {...register("author", { required: "Author is required" })}
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                {...getCoverRootProps()}
                sx={{
                  p: 3,
                  border: "2px dashed #ccc",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getCoverInputProps()} />
                <Typography>
                  Drag and drop cover image here, or click to select
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (JPEG, JPG, PNG)
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                {...getPdfRootProps()}
                sx={{
                  p: 3,
                  border: "2px dashed #ccc",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getPdfInputProps()} />
                <Typography>
                  Drag and drop PDF file here, or click to select
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (PDF only)
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Book
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UploadBook;
