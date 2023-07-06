import { Box, Button, Modal, TextField } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CustomField from "./CustomField";

export interface AddItemModalProps {
  collectionPageStore: CollectionPageStore;
}

const AddItemModal = ({ collectionPageStore }: AddItemModalProps) => {
  const [itemConfigStore, setItemConfigStore] = useState(new ItemConfigStore(collectionPageStore.itemFields));

  useEffect(() => {
    setItemConfigStore(new ItemConfigStore(collectionPageStore.itemFields));
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
        {itemConfigStore.itemFields.map((field) => (
          <CustomField
            key={field.id}
            field={field}
            itemConfigStore={itemConfigStore}
          />
        ))}
        <Button variant="contained">add item</Button>
      </Box>
    </Modal>
  );
};

export default observer(AddItemModal);
