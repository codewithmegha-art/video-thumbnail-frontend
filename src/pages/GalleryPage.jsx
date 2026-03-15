import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
  Paper
} from "@mui/material";

import SearchOffIcon from "@mui/icons-material/SearchOff";

import VideoCard from "../components/VideoCard";

export default function GalleryPage() {

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await api.get("/videos");
      return res.data;
    }
  });

  const videosData = Array.isArray(data) ? data : data?.videos || [];

  // Filtered videos
  const videos = useMemo(() => {
    return videosData.filter((v) => {
      const matchSearch = search
        ? v.title?.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchTag = tag
        ? v.tags?.includes(tag)
        : true;

      return matchSearch && matchTag;
    });
  }, [videosData, search, tag]);

  // Unique tags
  const allTags = [...new Set(videosData.flatMap((v) => v.tags || []))];

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">Loading videos...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Failed to load videos
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>

      <Typography variant="h4" mb={3}>
        Video Gallery
      </Typography>

      {/* Search + Filter */}

      <Box display="flex" gap={2} mb={4} flexWrap="wrap">

        <TextField
          label="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />

        <TextField
          select
          label="Filter by tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          size="small"
          sx={{ width: 200 }}
        >

          <MenuItem value="">All</MenuItem>

          {allTags.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}

        </TextField>

      </Box>

      {/* Video Grid */}

      {videos.length === 0 ? (

        <Paper
          elevation={3}
          sx={{
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 3
          }}
        >

          <SearchOffIcon sx={{ fontSize: 60, color: "gray", mb: 2 }} />

          <Typography variant="h6">
            No videos found
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter
          </Typography>

        </Paper>

      ) : (

        <Grid container spacing={3}>

          {videos.map((video) => (

            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <VideoCard video={video} />
            </Grid>

          ))}

        </Grid>

      )}

    </Container>
  );
}