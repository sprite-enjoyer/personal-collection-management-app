import { Box, Card, CardHeader, CardMedia, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../misc/theme";

export interface CollectionCardProps {
  name: string;
  description: string;
  id: string;
  topic: string;
  image?: string;
  showImage: boolean;
  ownerName?: string;
}

const NO_IMAGE =
  "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=";

const CollectionCard = ({ image, name, topic, id, showImage, ownerName }: CollectionCardProps) => {
  const { theme } = useThemeContext();
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
        minHeight: "200px",
        minWidth: "200px",
        maxWidth: "300px",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}>
      <CardHeader
        title={`${name}`}
        color={theme.palette.text.secondary}
        titleTypographyProps={{ variant: name.length < 30 ? "h5" : "h6", textAlign: "center" }}
      />
      <Box padding={"0px 20px"}>
        <Typography
          variant="h6"
          fontStyle={"italic"}
          textAlign={"center"}>
          {topic}
        </Typography>
        {showImage && (
          <CardMedia
            sx={{
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              backgroundColor: theme.palette.background.default,
            }}
            component={"img"}
            height={"80%"}
            image={!image || image.length === 0 ? NO_IMAGE : image}
          />
        )}
      </Box>
    </Card>
  );
};

export default CollectionCard;
