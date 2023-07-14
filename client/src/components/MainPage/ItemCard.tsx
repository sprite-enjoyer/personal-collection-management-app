import { Box, Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
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
          <Box display={"flex"}>
            <Typography>top tags: </Typography>
            <Box>
              {item.tags.length === 0 ? (
                <Typography>none</Typography>
              ) : (
                item.tags.slice(0, 5).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ margin: "2px", paddingLeft: "0", paddingRight: "0" }}
                  />
                ))
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
