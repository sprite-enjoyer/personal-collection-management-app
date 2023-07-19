import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { useContext } from "react";
import { GlobalUserInfoStoreContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useThemeContext } from "../../misc/theme";

interface DeleteCollectinoDialogProps {
  collectionConfigStore: CollectionConfigStore;
}

const DeleteCollectionDialog = ({ collectionConfigStore }: DeleteCollectinoDialogProps) => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const handleClose = () => {
    collectionConfigStore.setDeleteCollectionDialogOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={collectionConfigStore.deleteCollectionDialogOpen}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <DialogTitle textAlign={"center"}>delete this collection?</DialogTitle>
        {collectionConfigStore.deleteCollectionDialogOpen && (
          <Box marginTop={"20px"}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px" }}>
              <Button
                onClick={() => collectionConfigStore.deleteCollection(navigate, globalUserInfoStore.userName)}
                size="small"
                variant="contained">
                yes
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => collectionConfigStore.setDeleteCollectionDialogOpen(false)}>
                no
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default observer(DeleteCollectionDialog);
