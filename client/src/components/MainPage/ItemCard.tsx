import { Box, Divider, Paper, Typography } from "@mui/material";
import { ItemCardItem } from "../../misc/types";
import { Link } from "react-router-dom";
import { CSSProperties } from "@mui/material/styles/createMixins";

interface ItemCardProps {
  item: ItemCardItem;
  onCardClick: () => void;
  styles?: CSSProperties;
}

const ItemCard = ({ item, styles, onCardClick }: ItemCardProps) => {
  return (
    <Box sx={{ maxWidth: "400px", maxHeight: "70px", ...styles }}>
      <Link
        onClick={() => onCardClick()}
        style={{ all: "unset", cursor: "pointer", width: "100%", height: "100%" }}
        to={`/item/${item._id}`}>
        <Paper sx={{ padding: "10px", display: "flex", flexWrap: "wrap", width: "100%", height: "100%" }}>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"space-around"}>
            <Typography>{`${item.name} from ${item.containerCollection.name}`}</Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ margin: "0 10px", borderColor: "rgba(0, 0, 0, 0.3)", height: "100%" }}
            />
            <Typography>{`owner: ${item.owner.username}`}</Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default ItemCard;
