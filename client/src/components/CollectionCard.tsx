import { Box, Card, CardHeader, CardMedia, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface CollectionCardProps {
  name: string;
  description: string;
  id: string;
  topic: string;
  image?: string;
}

const NO_IMAGE =
  "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=";

const CollectionCard = ({ image, name, topic, id }: CollectionCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/collection/${id}`);
  };

  return (
    <Card
      component={Paper}
      elevation={4}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        maxHeight: "400px",
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        border: "1px solid black",
        maxWidth: "550px",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-between",
      }}>
      <CardHeader
        color="black"
        title={name}
        titleTypographyProps={{ variant: "h4", textAlign: "center" }}
      />
      <Typography
        fontStyle={"italic"}
        textAlign={"center"}>
        {topic}
      </Typography>
      <CardMedia
        sx={{ borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}
        component={"img"}
        height={"80%"}
        image={!image || image.length === 0 ? NO_IMAGE : image}
      />
    </Card>
  );
};

export default CollectionCard;
