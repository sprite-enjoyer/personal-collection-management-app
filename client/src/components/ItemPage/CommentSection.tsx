import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import CommentStore from "../../stores/CommentStore";
import { useState, useContext, useEffect } from "react";
import { GlobalUserInfoStoreContext } from "../../App";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { io } from "socket.io-client";
import { useThemeContext } from "../../misc/theme";
import { useScreenSizeContext } from "../../misc/screenSize";

interface CommentSectionProps {
  itemID: string;
}

const CommentSection = ({ itemID }: CommentSectionProps) => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const [commentStore] = useState(new CommentStore(itemID, globalUserInfoStore));
  const { theme } = useThemeContext();
  const { userHasSmallScreen } = useScreenSizeContext();

  useEffect(() => {
    const loadComments = async () => await commentStore.fetchComments();
    loadComments();

    const socket = io(import.meta.env.VITE_SERVER_URL)
      .connect()
      .emit("join-room", itemID);

    socket.on("new-comment", (newComment) => {
      commentStore.addComment(newComment);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: userHasSmallScreen ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "5%",
        gap: "20px",
        backgroundColor: theme.palette.background.default,
      }}>
      <Box
        sx={
          userHasSmallScreen
            ? {
                height: "500px",
                width: "100%",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: theme.palette.background.default,
              }
            : {
                height: "70%",
                width: "80%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                backgroundColor: theme.palette.background.default,
              }
        }>
        {userHasSmallScreen && (
          <Typography
            fontSize={"1.2em"}
            color={theme.palette.text.primary}>
            Comments:{" "}
          </Typography>
        )}
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
            maxHeight: "100%",
          }}>
          {commentStore.comments.map((comment) => (
            <ListItem
              key={comment._id}
              sx={{ width: "100%", paddingLeft: "0" }}>
              <Paper
                sx={{ width: "100%", padding: "20px 10px 20px 0", backgroundColor: theme.palette.background.paper }}>
                <ListItemText
                  primary={
                    <Typography
                      marginBottom={"10px"}
                      variant="h5"
                      color={theme.palette.text.primary}>
                      {comment.author}:
                    </Typography>
                  }
                  secondary={
                    <Typography
                      padding={"0 0 5px 30px"}
                      variant="body1"
                      color={theme.palette.text.secondary}>
                      {comment.text}
                    </Typography>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          width: userHasSmallScreen ? "100%" : "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <TextField
          fullWidth
          multiline
          size={"small"}
          maxRows={5}
          value={commentStore.commentFieldValue}
          onChange={(e) => commentStore.setCommentFieldValue(e.target.value)}
          sx={{ width: "100%" }}
          InputProps={{
            endAdornment: (
              <Button
                sx={{ aspectRatio: "1", minWidth: "20px" }}
                onClick={async () => await commentStore.postComment()}>
                <AddCommentIcon />
              </Button>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default observer(CommentSection);
