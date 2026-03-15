import { Card, CardMedia, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function VideoCard({video}){

  const navigate = useNavigate()

  return(

    <Card
      onClick={()=>navigate(`/video/${video._id}`)}
      sx={{cursor:"pointer"}}
    >

      <CardMedia
        component="img"
        height="180"
        image={
          video.primaryThumbnail
          ? video.primaryThumbnail.url
          : "https://via.placeholder.com/400x220"
        }
      />

      <CardContent>

        <Typography variant="h6">
          {video.title}
        </Typography>

        <Typography variant="body2">
          {new Date(video.createdAt).toLocaleDateString()}
        </Typography>

      </CardContent>

    </Card>

  )

}