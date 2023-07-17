import { useParams } from "react-router-dom";
import { routeBaseStyles } from "../misc/styleUtils";
import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ProfilePageStore from "../stores/ProfilePageStore";
import { observer } from "mobx-react";
import CollectionConfigModal from "../components/ProfilePage/CollectionConfigModal";
import CollectionList from "../components/CollectionList";
import { GlobalUserInfoStoreContext } from "../App";

const ProfilePage = () => {
  const { userName } = useParams();
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  if (!userName) return null;
  globalUserInfoStore.setCurrentlyViewingUser(userName);
  const [profilePageStore] = useState(new ProfilePageStore(userName));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "40px 0 40px 0",
            width: "80%",
            justifyContent: "space-between",
          }}>
          <Typography variant="h3">{userName}'s collections</Typography>
          {globalUserInfoStore.loggedInUserHasPermissionToEdit && (
            <>
              <Button
                onClick={() => profilePageStore.setCollectionConfigModalOpen(true)}
                variant="contained">
                create collection
              </Button>
              <CollectionConfigModal
                profilePageStore={profilePageStore}
                creatingCollection={true}
              />
            </>
          )}
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            padding: "20px",
          }}>
          <CollectionList
            collections={profilePageStore.collections}
            showImage
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(ProfilePage);
