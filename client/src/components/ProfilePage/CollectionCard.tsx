import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
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
      sx={{ cursor: "pointer" }}>
      <CardHeader title={name} />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={`${name} collection image`}
      />
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
