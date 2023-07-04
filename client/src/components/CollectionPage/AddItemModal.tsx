import { Box, Modal } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";

export interface AddItemModalProps {
  collectionPageStore: CollectionPageStore;
}

const AddItemModal = ({ collectionPageStore }: AddItemModalProps) => {
  return (
    <Modal
      open={collectionPageStore.addItemModalOpen}
      onClose={() => collectionPageStore.setAddItemModalOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "50px" }}>
        {collectionPageStore.itemFields &&
          collectionPageStore.itemFields.map((field, i) => <Box key={i}>{field.name}</Box>)}
      </Box>
    </Modal>
  );
};

export default observer(AddItemModal);
