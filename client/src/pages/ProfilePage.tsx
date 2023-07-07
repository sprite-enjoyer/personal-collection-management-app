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
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          outline: "2px solid plum",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            gap: "20px",
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
        <Container
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}>
          <CollectionList profilePageStore={profilePageStore} />
        </Container>
      </Container>
    </div>
  );
};

export default observer(ProfilePage);
