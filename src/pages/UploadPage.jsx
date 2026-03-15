import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  LinearProgress,
  Grid,
  Card,
  CardMedia
} from "@mui/material";

export default function UploadPage() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const [videoId, setVideoId] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumb, setSelectedThumb] = useState(null);

  const selectedFile = watch("video");

  const videoPreview = useMemo(() => {

    if (selectedFile && selectedFile[0]) {
      return URL.createObjectURL(selectedFile[0]);
    }

    return null;

  }, [selectedFile]);



  const uploadMutation = useMutation({

    mutationFn: async (formData) => {

      const res = await api.post("/videos/upload", formData, {

        headers: { "Content-Type": "multipart/form-data" },

        onUploadProgress: (event) => {

          if (!event.total) return;

          const percent = Math.round(
            (event.loaded * 100) / event.total
          );

          setProgress(percent);

        }

      });

      return res.data;

    },

    onSuccess: async (data) => {

      setMessage("✅ Video uploaded successfully");

      setProgress(0);

      const id = data._id || data.videoId;

      setVideoId(id);

      // generate thumbnails
      const thumbRes = await api.post(
        `/videos/${id}/thumbnails/generate`
      );

      setThumbnails(thumbRes.data);

      reset();

    },

    onError: (error) => {

      const msg =
        error?.response?.data?.message || "Upload failed";

      setMessage(`❌ ${msg}`);

      setProgress(0);

    }

  });



  const onSubmit = (data) => {

    const formData = new FormData();

    formData.append("video", data.video[0]);
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("tags", data.tags || "");

    uploadMutation.mutate(formData);

  };



  const selectThumbnail = async (thumbnailId) => {

    await api.post(`/videos/${videoId}/thumbnails/select`, {

      thumbnailId

    });

    setSelectedThumb(thumbnailId);

    setMessage("🎉 Primary thumbnail selected");

  };



  const handleDrop = (e) => {

    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {

      setValue("video", [file]);

    }

  };



  return (

    <Container maxWidth="sm">

      <Box mt={6}>

        <Paper elevation={3} sx={{ p: 3 }}>

          <Typography variant="h5" fontWeight="bold" mb={3}>
            Upload Video
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>

              {/* Drag & Drop */}

              <Box
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                sx={{
                  border: "2px dashed #ccc",
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  background: "#fafafa"
                }}
              >

                <Typography mb={1}>
                  Drag & Drop Video Here
                </Typography>

                <Button variant="outlined" component="label">

                  Select Video

                  <input
                    hidden
                    type="file"
                    accept="video/*"
                    {...register("video", {
                      required: "Video is required"
                    })}
                  />

                </Button>

              </Box>

              {errors.video && (

                <Typography color="error" fontSize={14}>
                  {errors.video.message}
                </Typography>

              )}

              {/* Video Preview */}

              {videoPreview && (

                <Box>

                  <Typography variant="subtitle2" mb={1}>
                    Video Preview
                  </Typography>

                  <Box display="flex" justifyContent="center">

                    <video
                      controls
                      style={{
                        width: "260px",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                      }}
                    >
                      <source src={videoPreview} />
                    </video>

                  </Box>

                </Box>

              )}

              {/* Title */}

              <TextField
                label="Title"
                size="small"
                fullWidth
                {...register("title", {
                  required: "Title is required"
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              {/* Description */}

              <TextField
                label="Description"
                size="small"
                multiline
                rows={3}
                fullWidth
                {...register("description")}
              />

              {/* Tags */}

              <TextField
                label="Tags (comma separated)"
                size="small"
                fullWidth
                {...register("tags")}
              />

              {/* Upload Progress */}

              {progress > 0 && (

                <Box>

                  <Typography variant="body2">
                    Upload Progress {progress}%
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                  />

                </Box>

              )}

              {/* Submit */}

              <Button
                variant="contained"
                type="submit"
                disabled={uploadMutation.isLoading}
              >

                {uploadMutation.isLoading
                  ? "Uploading..."
                  : "Upload Video"}

              </Button>

            </Stack>

          </form>

          {/* Message */}

          {message && (

            <Box mt={3}>

              <Alert
                severity={
                  message.includes("❌")
                    ? "error"
                    : "success"
                }
              >
                {message}
              </Alert>

            </Box>

          )}

          {/* Thumbnail Grid */}

          {thumbnails.length > 0 && (

            <Box mt={4}>

              <Typography variant="h6" mb={2}>
                Select Thumbnail
              </Typography>

              <Grid container spacing={2}>

                {thumbnails.map((thumb) => (

                  <Grid item xs={6} sm={4} key={thumb._id}>

                    <Card
                      sx={{
                        border:
                          selectedThumb === thumb._id
                            ? "3px solid #1976d2"
                            : "1px solid #ddd",
                        cursor: "pointer"
                      }}

                      onClick={() =>
                        selectThumbnail(thumb._id)
                      }
                    >

                      <CardMedia
                        component="img"
                        height="90"
                        image={thumb.url}
                      />

                    </Card>

                  </Grid>

                ))}

              </Grid>

            </Box>

          )}

        </Paper>

      </Box>

    </Container>

  );

}