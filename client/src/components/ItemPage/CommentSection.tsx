import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import CommentStore from "../../stores/CommentStore";
import { useState, useContext, useEffect } from "react";
import { GlobalUserInfoStoreContext } from "../../App";
import AddCommentIcon from "@mui/icons-material/AddComment";
interface CommentSectionProps {
  itemID: string;
}

const CommentSection = ({ itemID }: CommentSectionProps) => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const [commentStore] = useState(new CommentStore(itemID, globalUserInfoStore));

  useEffect(() => {
    const loadComments = async () => await commentStore.fetchComments();
    loadComments();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "5%",
        gap: "20px",
      }}>
      <Box sx={{ height: "70%", width: "80%", overflow: "auto", display: "flex", justifyContent: "center" }}>
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {commentStore.comments.map((comment) => (
            <ListItem
              key={comment._id}
              sx={{ width: "100%", paddingLeft: "0" }}>
              <Paper sx={{ width: "100%", padding: "20px 10px 20px 0" }}>
                <ListItemText
                  primary={
                    <Typography
                      marginBottom={"10px"}
                      variant="h5">
                      {comment.author}:
                    </Typography>
                  }
                  secondary={
                    <Typography
                      padding={"0 0 5px 30px"}
                      variant="body1">
                      {comment.text}
                    </Typography>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ height: "20%", width: "80%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <TextField
          fullWidth
          multiline
          size={"small"}
          maxRows={5}
          value={commentStore.commentFieldValue}
          onChange={(e) => commentStore.setCommentFieldValue(e.target.value)}
          sx={{ width: "80%" }}
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
