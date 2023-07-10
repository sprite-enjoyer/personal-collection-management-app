import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemTable from "../components/CollectionPage/ItemTable";
import { routeBaseStyles } from "../misc/styleUtils";
import { observer } from "mobx-react";
import { Box, Button, Container, Typography } from "@mui/material";
import CollectionConfigModal from "../components/ProfilePage/CollectionConfigModal";
import ItemConfigModal from "../components/CollectionPage/ItemConfigModal";
import { GlobalUserInfoStoreContext } from "../App";
import { Collection } from "../misc/types";
import ItemConfigStore from "../stores/ItemConfigStore";

const CollectionPage = () => {
  const { collection, userName } = useLoaderData() as { collection: Collection; userName: string };
  const [collectionPageStore] = useState(new CollectionPageStore(collection, userName));
  const [itemConfigStore] = useState(new ItemConfigStore(collection));
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  useEffect(() => globalUserInfoStore.setCurrentlyViewingUser(userName), []);
  return (
    <>
      <div style={{ ...routeBaseStyles, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            width: "80%",
            justifyContent: "flex-end",
            margin: "50px 0 0 0",
          }}>
          {globalUserInfoStore.loggedInUserHasPermissionToEdit && (
            <>
              <CollectionConfigModal
                buttonText="Edit Collection"
                creatingCollection={false}
              />
              <Button
                variant="contained"
                onClick={() => collectionPageStore.setItemConfigModalOpen(true)}>
                add item
              </Button>
            </>
          )}
        </Box>
        {collectionPageStore.shouldRenderTable ? (
          <ItemTable collection={collectionPageStore.collection} />
        ) : (
          <Container sx={{ marginTop: "100px" }}>
            <Typography
              align="center"
              variant="h3">
              No items in this collection yet!
            </Typography>
          </Container>
        )}
      </div>
      <ItemConfigModal
        itemConfigStore={itemConfigStore}
        creatingItem={true}
        collectionPageStore={collectionPageStore}
        editingItemID={null}
      />
    </>
  );
};

export default observer(CollectionPage);
