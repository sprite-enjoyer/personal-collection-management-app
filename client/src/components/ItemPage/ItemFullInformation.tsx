import { Box, Typography, Chip, List, ListItem } from "@mui/material";
import { Item } from "../../misc/types";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

interface ItemFullInformationProps {
  item: Item;
  collectionName: string;
  ownerUserName: string;
}

const ItemFullInformation = ({ item, collectionName, ownerUserName }: ItemFullInformationProps) => {
  return (
    <Box
      sx={{
        border: "2px solid green",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        maxwidth: "40%",
      }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h3">{item.name}</Typography>
        <Typography variant="h5">
          Owner: <Link to={`/user/${ownerUserName}`}>{ownerUserName}</Link>
        </Typography>
        <Typography variant="h5">
          From Collection: <Link to={`/collection/${item.containerCollection}`}> {collectionName}</Link>
        </Typography>
        <Typography variant="h5">Tags:{item.tags}</Typography>
        <Typography variant="h5">Additional Fields:</Typography>
      </Box>
      <Box>
        {item.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="outlined"
          />
        ))}
      </Box>

      <List
        sx={{
          maxwidth: "50%",
          width: "50%",
          maxHeight: "60%",
          overflow: "auto",
          paddingRight: "50%",
          paddingLeft: "0",
        }}>
        {item.additionalFields.map((field) => (
          <ListItem
            sx={{ padding: "0", margin: "20px 0 20px 0" }}
            key={field._id}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">{field.name}:</Typography>
              <MDEditor.Markdown
                style={{ backgroundColor: "white", color: "black", fontSize: "20px" }}
                source={field.type === "date" ? field.value?.toLocaleString() : field.value?.toString()}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemFullInformation;
