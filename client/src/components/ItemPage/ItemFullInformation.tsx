import { Box, Typography, Chip, List, ListItem, IconButton, Button } from "@mui/material";
import { Item } from "../../misc/types";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../misc/theme";
import { useLanguageContext } from "../../misc/language";
import { useScreenSizeContext } from "../../misc/screenSize";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GlobalUserInfoStoreContext } from "../../App";

interface ItemFullInformationProps {
  collectionName: string;
  ownerUserName: string;
  currentItem: Item;
  setCurrentItem: (newValue: Item) => void;
}

const ItemFullInformation = ({
  collectionName,
  ownerUserName,
  currentItem,
  setCurrentItem,
}: ItemFullInformationProps) => {
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      ItemPage: { owner, fromCollection, tags, additionalFields, none, likes, likeButton },
    },
  } = useLanguageContext();
  const { userHasSmallScreen } = useScreenSizeContext();
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  console.log(currentItem.usersWhoLikeItem, ":users who like item");

  const userLikesItem = useMemo(() => {
    if (!globalUserInfoStore.user) return false;
    return currentItem.usersWhoLikeItem.includes(globalUserInfoStore.user._id);
  }, [currentItem, globalUserInfoStore.user]);

  const handleLikeButtonClick = async () => {
    if (!globalUserInfoStore.user) return;
    const likeOrUnlike = userLikesItem ? "unlike" : "like";
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/items/${likeOrUnlike}`, {
      itemID: currentItem._id,
      userID: globalUserInfoStore.user._id,
    });
    const { data } = response.data as { data: Item };
    if (data) setCurrentItem(data);
  };

  return (
    <Box
      sx={{
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        width: userHasSmallScreen ? "100%" : "50%",
        boxSizing: "border-box",
        overflow: userHasSmallScreen ? "initial" : "auto",
        height: userHasSmallScreen ? "fit-content" : "auto",
        backgroundColor: theme.palette.background.default,
      }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <Typography
          variant={currentItem.name.length > 70 || userHasSmallScreen ? "h5" : "h3"}
          maxHeight={"150px"}
          overflow="auto"
          sx={{ color: theme.palette.text.primary }}>
          {currentItem.name}
        </Typography>
        <Typography
          overflow="auto"
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}>
          {owner}
          <Link
            target="_blank"
            to={`/user/${ownerUserName}`}
            style={{ color: theme.palette.text.primary }}>
            {ownerUserName}
          </Link>
        </Typography>
        <Typography
          overflow="auto"
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}>
          {fromCollection}
          <Link
            target="_blank"
            style={{ color: theme.palette.text.primary }}
            to={`/collection/${currentItem.containerCollection}`}>
            {collectionName}
          </Link>
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}>
          {tags}
        </Typography>
        <Typography
          marginRight={"auto"}
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}>
          {likes}
          {currentItem.usersWhoLikeItem.length}
        </Typography>
        <Button
          onClick={handleLikeButtonClick}
          sx={{
            maxWidth: "100px",
            marginBottom: "50px",
            color: userLikesItem ? "" : theme.palette.text.secondary,
          }}>
          <Box
            display={"flex"}
            gap={"5px"}
            alignItems={"center"}>
            {likeButton}
            <ThumbUpIcon sx={{ width: "20px", height: "20px", aspectRatio: "1", paddingBottom: "2px" }} />
          </Box>
        </Button>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={0.5}>
          {currentItem.tags.map((tag) => (
            <Chip
              sx={{ color: theme.palette.text.primary }}
              key={tag}
              label={tag}
              variant="outlined"
            />
          ))}
        </Box>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}>
          {additionalFields} {currentItem.additionalFields.length === 0 && none}
        </Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          paddingLeft: "0",
        }}>
        {currentItem.additionalFields.map((field) => (
          <ListItem
            sx={{ padding: "0", margin: "20px 0 20px 0", color: theme.palette.text.secondary }}
            key={field._id}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">{field.name}:</Typography>
              <MDEditor.Markdown
                style={{
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  fontSize: "20px",
                }}
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
