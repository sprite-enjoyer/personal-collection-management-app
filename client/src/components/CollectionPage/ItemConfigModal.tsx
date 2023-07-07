import { Box, Button, Modal, TextField } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CustomField from "./CustomField";
import { GlobalUserInfoStoreContext } from "../../App";

export interface AddItemModalProps {
  collectionPageStore: CollectionPageStore;
  creatingItem: boolean;
}

const ItemConfigModal = ({ collectionPageStore, creatingItem }: AddItemModalProps) => {
  const [itemConfigStore] = useState(new ItemConfigStore(collectionPageStore.itemFields));
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  useEffect(() => {
    itemConfigStore.setItemFields(collectionPageStore.itemFields, true);
  }, [collectionPageStore, collectionPageStore.itemFields]);

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
        }}>
        <TextField
          value={itemConfigStore.name}
          placeholder="name"
          label="name"
          onChange={(e) => itemConfigStore.setName(e.target.value)}
        />
        {itemConfigStore.itemFields.map((field) => (
          <CustomField
            key={field.id}
            field={field}
            itemConfigStore={itemConfigStore}
          />
        ))}
        <Button
          onClick={async () => {
            await itemConfigStore.createItem(collectionPageStore.collection._id, collectionPageStore.collection.owner);
            collectionPageStore.setAddItemModalOpen(false);
            const updatedCollection = await CollectionPageStore.fetchCollection(collectionPageStore.collection._id);
            collectionPageStore.setCollection(updatedCollection);
          }}
          variant="contained">
          add item
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(ItemConfigModal);
