import { useLoaderData, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ProfilePageStore from "../stores/ProfilePageStore";
import { observer } from "mobx-react";
import CollectionConfigModal from "../components/ProfilePage/CollectionConfigModal";
import CollectionList from "../components/CollectionList";
import { GlobalUserInfoStoreContext } from "../App";
import { Collection } from "../misc/types";
import { useThemeContext } from "../misc/theme";
import { useLanguageContext } from "../misc/language";
import { useScreenSizeContext } from "../misc/screenSize";

const ProfilePage = () => {
  const { userName } = useParams();
  const { collections } = useLoaderData() as { collections: Collection[] };
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const [profilePageStore] = useState(new ProfilePageStore(userName ?? "", collections));
  const [collectionConfigModalOpen, setCollectionConfigModalOpen] = useState(false);
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      ProfilePage: { header, button },
    },
  } = useLanguageContext();
  const { userHasSmallScreen } = useScreenSizeContext();

  if (!userName) return null;
  globalUserInfoStore.setCurrentlyViewingUser(userName);

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
            flexDirection: userHasSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            gap: "20px",
          }}>
          <Typography
            variant="h3"
            color={theme.palette.text.primary}>
            {userName}
            {header}
          </Typography>
          {globalUserInfoStore.loggedInUserHasPermissionToEdit && (
            <>
              <Button
                onClick={() => setCollectionConfigModalOpen(true)}
                variant="contained">
                {button}
              </Button>
              <CollectionConfigModal
                profilePageStore={profilePageStore}
                creatingCollection={true}
                collectionConfigModalOpen={collectionConfigModalOpen}
                setCollectionConfigModalOpen={setCollectionConfigModalOpen}
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
