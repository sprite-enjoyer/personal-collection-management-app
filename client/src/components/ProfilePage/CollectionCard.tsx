import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface CollectionCardProps {
  name: string;
  description: string;
  id: string;
  image?: string;
}

const CollectionCard = ({ image, name, description, id }: CollectionCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/collection/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        maxHeight: "400px",
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        boxShadow: "1px 2px 2px 0px #00000091",
        border: "1px solid black",
        maxWidth: "550px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
        <Typography
          margin={"20px"}
          variant="h4">
          {name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", height: "80%" }}>
        {image && (
          <Box width={"50%"}>
            <img
              src={image}
              loading="lazy"
              alt={`${name} collection image`}
              style={{ height: "100%", width: "auto" }}
            />
          </Box>
        )}
        <Box width={image ? "50%" : "100%"}>
          <Typography
            padding={"20px"}
            variant="h6">
            {description.length > 120 ? description.slice(0, 120) + "..." : description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CollectionCard;
