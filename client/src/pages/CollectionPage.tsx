import { useState } from "react";
import { useParams } from "react-router-dom";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemTable from "../components/CollectionPage/ItemTable";
import { routeBaseStyles } from "../misc/styleUtils";
import { observer } from "mobx-react";
import { Box, Button, Container, Typography } from "@mui/material";
import CollectionConfigModal from "../components/ProfilePage/CollectionConfigModal";
import AddItemModal from "../components/CollectionPage/AddItemModal";

const CollectionPage = () => {
  const { collectionID } = useParams();
  if (!collectionID) return null;
  const [collectionPageStore] = useState(new CollectionPageStore(collectionID));

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
          <CollectionConfigModal
            buttonText="Edit Collection"
            creatingCollection={false}
          />
          <Button
            variant="contained"
            onClick={() => collectionPageStore.setAddItemModalOpen(true)}>
            add item
          </Button>
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
      <AddItemModal collectionPageStore={collectionPageStore} />
    </>
  );
};

export default observer(CollectionPage);
