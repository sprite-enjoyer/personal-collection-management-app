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
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        boxSizing: "border-box",
      }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <Typography
          variant={item.name.length > 70 ? "h5" : "h3"}
          overflow="auto">
          {item.name}
        </Typography>
        <Typography
          overflow="auto"
          variant="h5">
          Owner:{" "}
          <Link
            target="_blank"
            to={`/user/${ownerUserName}`}>
            {ownerUserName}
          </Link>
        </Typography>
        <Typography
          overflow="auto"
          variant="h5">
          From Collection:{" "}
          <Link
            target="_blank"
            to={`/collection/${item.containerCollection}`}>
            {collectionName}
          </Link>
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
          width: "100%",
          maxHeight: "60%",
          overflow: "auto",
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
