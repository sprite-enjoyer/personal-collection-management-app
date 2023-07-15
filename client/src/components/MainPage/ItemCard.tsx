import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ItemCardItem } from "../../misc/types";
import { Link } from "react-router-dom";

interface ItemCardProps {
  item: ItemCardItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link
      style={{ all: "unset", cursor: "pointer" }}
      to={`/collection/${item.containerCollection._id}`}>
      <Card>
        <CardHeader
          title={item.name}
          subheader={`From ${item.containerCollection.name}`}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography>owner: {item.owner.username}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
