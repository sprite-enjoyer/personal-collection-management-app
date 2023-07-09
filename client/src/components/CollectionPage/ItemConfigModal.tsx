import { Box, Button, Modal, TextField } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import { GlobalUserInfoStoreContext } from "../../App";
import { Collection } from "../../misc/types";
import CustomFieldsInputList from "./CustomFieldsInputList";

export interface AddItemModalProps {
  collectionPageStore: CollectionPageStore;
  creatingItem: boolean;
  collection: Collection;
}

const ItemConfigModal = ({ collectionPageStore, creatingItem, collection }: AddItemModalProps) => {
  const [itemConfigStore] = useState(new ItemConfigStore(collection));
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  useEffect(() => {
    itemConfigStore.setAdditionalFields(
      ItemConfigStore.fillAdditionalFieldsWithEmptyValues(collectionPageStore.collection.additionalFieldsInfo)
    );
  }, [collectionPageStore, collectionPageStore.collection.additionalFieldsInfo]);

  const handleClick = async () => {
    await itemConfigStore.createItem(collectionPageStore.collection._id, collectionPageStore.collection.owner);
    collectionPageStore.setAddItemModalOpen(false);
    const updatedCollection = await CollectionPageStore.fetchCollection(collectionPageStore.collection._id);
    collectionPageStore.setCollection(updatedCollection);
  };

  return (
    <Modal
      open={collectionPageStore.addItemModalOpen}
      onClose={() => collectionPageStore.setAddItemModalOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          maxHeight: "500px",
          width: "500px",
        }}>
        <TextField
          value={itemConfigStore.name}
          placeholder="name"
          label="name"
          onChange={(e) => itemConfigStore.setName(e.target.value)}
        />
        <CustomFieldsInputList itemConfigStore={itemConfigStore} />
        <Button
          onClick={handleClick}
          variant="contained">
          add item
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(ItemConfigModal);
