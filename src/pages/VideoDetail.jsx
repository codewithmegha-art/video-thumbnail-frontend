// import { useParams } from "react-router-dom"
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import api from "../services/api"

// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Card,
//   CardMedia,
//   Chip,
//   Stack
// } from "@mui/material"

// export default function VideoDetail() {

//   const { id } = useParams()
//   const queryClient = useQueryClient()

//   // GET VIDEO DETAILS

//   const { data, isLoading } = useQuery({

//     queryKey: ["video", id],

//     queryFn: async () => {
//       const res = await api.get(`/videos/${id}`)
//       return res.data
//     }

//   })

//   // SELECT PRIMARY THUMBNAIL

//   const selectThumbnailMutation = useMutation({

//     mutationFn: async (thumbnailId) => {
//       return api.post(`/videos/${id}/thumbnails/select`, {
//         thumbnailId
//       })
//     },

//     onSuccess: () => {
//       // refresh video data
//       queryClient.invalidateQueries(["video", id])
//     }

//   })

//   if (isLoading) {
//     return <Typography>Loading...</Typography>
//   }

//   const video = data.video
//   const thumbnails = data.thumbnails

//   return (

//     <Container maxWidth="md" sx={{ mt: 6 }}>

//       {/* VIDEO TITLE */}

//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         gutterBottom
//       >
//         {video.title}
//       </Typography>

//       {/* UPLOAD DATE */}

//       <Typography
//         variant="body2"
//         color="text.secondary"
//         mb={2}
//       >
//         Uploaded on {new Date(video.createdAt).toLocaleDateString()}
//       </Typography>

//       {/* VIDEO PLAYER */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mb: 3
//         }}
//       >

//         <Card
//           sx={{
//             width: "100%",
//             maxWidth: 700,
//             aspectRatio: "16/9",
//             overflow: "hidden",
//             borderRadius: 3
//           }}
//         >

//           <video
//             controls
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover"
//             }}
//           >
//             <source src={`http://localhost:5000${video.videoUrl}`} />
//           </video>

//         </Card>

//       </Box>

//       {/* DESCRIPTION */}

//       <Typography
//         variant="body1"
//         sx={{ mb: 3 }}
//       >
//         {video.description || "No description provided"}
//       </Typography>

//       {/* TAGS */}

//       <Stack
//         direction="row"
//         spacing={1}
//         mb={4}
//         flexWrap="wrap"
//       >

//         {video.tags?.map((tag, i) => (

//           <Chip
//             key={i}
//             label={tag}
//             color="primary"
//             variant="outlined"
//           />

//         ))}

//       </Stack>

//       {/* THUMBNAILS */}

//       <Typography
//         variant="h6"
//         fontWeight="bold"
//         mb={2}
//       >
//         Thumbnails
//       </Typography>

//       <Grid container spacing={2}>

//         {thumbnails.map((thumb) => {

//           const isPrimary =
//             thumb._id === video.primaryThumbnail?._id

//           return (

//             <Grid item xs={6} sm={4} key={thumb._id}>

//               <Card
//                 onClick={() =>
//                   selectThumbnailMutation.mutate(thumb._id)
//                 }
//                 sx={{
//                   cursor: "pointer",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   border: isPrimary
//                     ? "3px solid #1976d2"
//                     : "1px solid #e0e0e0",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 3
//                   }
//                 }}
//               >

//                 <CardMedia
//                   component="img"
//                   image={thumb.url}
//                 />

//               </Card>

//             </Grid>

//           )

//         })}

//       </Grid>

//     </Container>

//   )
// }

import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../services/api"

import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  Chip,
  Stack
} from "@mui/material"

export default function VideoDetail() {

  const { id } = useParams()
  const queryClient = useQueryClient()

  // FETCH VIDEO

  const { data, isLoading, error } = useQuery({

    queryKey: ["video", id],

    queryFn: async () => {
      const res = await api.get(`/videos/${id}`)
      return res.data
    }

  })

  // SELECT PRIMARY THUMBNAIL

  const selectThumbnailMutation = useMutation({

    mutationFn: async (thumbnailId) => {
      return api.post(`/videos/${id}/thumbnails/select`, {
        thumbnailId
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["video", id])
    }

  })

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography>Loading video...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">
          Failed to load video
        </Typography>
      </Container>
    )
  }

  const video = data.video
  const thumbnails = data.thumbnails || []

  return (

    <Container maxWidth="md" sx={{ mt: 6 }}>

      {/* TITLE */}

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        {video.title}
      </Typography>

      {/* DATE */}

      <Typography
        variant="body2"
        color="text.secondary"
        mb={2}
      >
        Uploaded on {new Date(video.createdAt).toLocaleDateString()}
      </Typography>

      {/* VIDEO PLAYER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3
        }}
      >

        <Card
          sx={{
            width: "100%",
            maxWidth: 720,
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: 3
          }}
        >

          <video
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          >
            <source src={`http://localhost:5000${video.videoUrl}`} />
          </video>

        </Card>

      </Box>

      {/* DESCRIPTION */}

      <Typography sx={{ mb: 3 }}>
        {video.description || "No description provided"}
      </Typography>

      {/* TAGS */}

      <Stack
        direction="row"
        spacing={1}
        mb={4}
        flexWrap="wrap"
      >

        {video.tags?.map((tag, i) => (

          <Chip
            key={i}
            label={tag}
            color="primary"
            variant="outlined"
          />

        ))}

      </Stack>

      {/* THUMBNAIL SECTION */}

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Thumbnails
      </Typography>

      {thumbnails.length === 0 ? (

        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #ccc",
            borderRadius: 2
          }}
        >
          <Typography color="text.secondary">
            No thumbnails generated
          </Typography>
        </Box>

      ) : (

        <Grid container spacing={3}>

          {thumbnails.map((thumb) => {

            const isPrimary =
              thumb._id === video.primaryThumbnail?._id

            return (

              <Grid item xs={12} sm={6} key={thumb._id}>

                <Card
                  onClick={() =>
                    !selectThumbnailMutation.isPending &&
                    selectThumbnailMutation.mutate(thumb._id)
                  }
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: selectThumbnailMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                    border: isPrimary
                      ? "3px solid #1976d2"
                      : "1px solid #e0e0e0",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 4
                    }
                  }}
                >

                  {/* PRIMARY BADGE */}

                  {isPrimary && (

                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background: "#1976d2",
                        color: "#fff",
                        px: 1.5,
                        py: 0.3,
                        fontSize: 12,
                        borderRadius: 1,
                        zIndex: 2
                      }}
                    >
                      Primary
                    </Box>

                  )}

                  <CardMedia
                    component="img"
                    height="200"
                    image={thumb.url}
                    sx={{
                      objectFit: "cover"
                    }}
                  />

                </Card>

              </Grid>

            )

          })}

        </Grid>

      )}

    </Container>

  )

}