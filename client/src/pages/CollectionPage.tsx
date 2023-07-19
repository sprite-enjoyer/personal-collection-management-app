import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemTable from "../components/CollectionPage/ItemTable";
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
  const [itemConfigStore] = useState(new ItemConfigStore(collection._id));
  const [itemConfigModalOpen, setItemConfigModalOpen] = useState(false);
  const [collectionConfigModalOpen, setCollectionConfigModalOpen] = useState(false);
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  useEffect(() => globalUserInfoStore.setCurrentlyViewingUser(userName), []);
  useEffect(() => {
    // const fetchItem = async () => await itemConfigStore.fetchItem();
    if (!itemConfigModalOpen) {
      itemConfigStore.resetUserInputs();
    }
  }, [itemConfigModalOpen]);

  const handleCollectionEditButtonClick = async () => {
    setCollectionConfigModalOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
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
              <Button
                variant="contained"
                sx={{
                  alignSelf: "flex-end",
                }}
                onClick={handleCollectionEditButtonClick}>
                edit collection
              </Button>
              <CollectionConfigModal
                creatingCollection={false}
                collectionPageStore={collectionPageStore}
                collectionConfigModalOpen={collectionConfigModalOpen}
                setCollectionConfigModalOpen={setCollectionConfigModalOpen}
              />
              <Button
                variant="contained"
                onClick={() => setItemConfigModalOpen(true)}>
                add item
              </Button>
            </>
          )}
        </Box>
        {collectionPageStore.shouldRenderTable ? (
          <ItemTable collectionPageStore={collectionPageStore} />
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
        itemConfigModalOpen={itemConfigModalOpen}
        setItemConfigModalOpen={setItemConfigModalOpen}
        handleButtonClick={async (updatedCollection: Collection) => {
          setItemConfigModalOpen(false);
          collectionPageStore.setCollection(updatedCollection);
        }}
      />
    </>
  );
};

export default observer(CollectionPage);
