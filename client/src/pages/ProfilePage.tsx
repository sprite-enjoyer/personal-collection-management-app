import { useParams } from "react-router-dom";
import { routeBaseStyles } from "../misc/styleUtils";
import { Box, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ProfilePageStore from "../stores/ProfilePageStore";
import { observer } from "mobx-react";
import CollectionConfigModal from "../components/ProfilePage/CollectionConfigModal";
import CollectionList from "../components/ProfilePage/CollectionList";
import { GlobalUserInfoStoreContext } from "../App";

const ProfilePage = () => {
  const { userName } = useParams();
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  if (!userName) return null;
  globalUserInfoStore.setCurrentlyViewingUser(userName);
  const [profilePageStore] = useState(new ProfilePageStore(userName));

  return (
    <div style={{ ...routeBaseStyles, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            outline: "2px solid black",
          }}>
          <Typography variant="h3">{userName}'s collections</Typography>
          {globalUserInfoStore.loggedInUserHasPermissionToEdit && (
            <CollectionConfigModal
              buttonText="add collection"
              profilePageStore={profilePageStore}
              creatingCollection={true}
            />
          )}
        </Box>
        <Box
          sx={{
            outline: "2px solid black",
            width: "80%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr max-content",
          }}>
          <CollectionList profilePageStore={profilePageStore} />
        </Box>
      </Box>
    </div>
  );
};

export default observer(ProfilePage);
