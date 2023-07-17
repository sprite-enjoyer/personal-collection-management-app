import { Box, Button, Modal } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useEffect } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CustomFieldsInputList from "./CustomFieldsInputList";
import ItemTableStore from "../../stores/ItemTableStore";
import { toJS } from "mobx";
import FixedFieldsInputList from "./FixedFieldsInputList";

export interface ItemConfigModalProps {
  itemConfigStore: ItemConfigStore;
  creatingItem: boolean;
  editingItemID: string | null;
  collectionPageStore: CollectionPageStore;
  itemTableStore?: ItemTableStore;
}

const ItemConfigModal = ({
  collectionPageStore,
  creatingItem,
  editingItemID,
  itemTableStore,
  itemConfigStore,
}: ItemConfigModalProps) => {
  useEffect(() => {
    if (creatingItem && collectionPageStore)
      itemConfigStore.setAdditionalFields(
        ItemConfigStore.fillAdditionalFieldsWithEmptyValues(collectionPageStore.collection.additionalFieldsInfo)
      );
  }, [collectionPageStore, collectionPageStore?.collection.additionalFieldsInfo]);

  useEffect(() => {
    const fetchItemTemp = async () => await itemConfigStore.fetchItem();
    fetchItemTemp();
  }, [itemTableStore?.itemConfigModalShown, collectionPageStore?.itemConfigModalOpen]);

  const handleClick = async () => {
    const updatedCollection = await CollectionPageStore.fetchCollection(
      itemTableStore?.collection._id ?? collectionPageStore.collection._id
    );

    if (creatingItem && collectionPageStore) {
      await itemConfigStore.createItem(collectionPageStore.collection._id, collectionPageStore.collection.owner);
      collectionPageStore.setItemConfigModalOpen(false);
      collectionPageStore.setCollection(updatedCollection);
      itemTableStore?.setCollection(updatedCollection);
    } else if (editingItemID !== null && itemTableStore) {
      await itemConfigStore.editItem(editingItemID);
      collectionPageStore.setCollection(updatedCollection);
      itemConfigStore.setCollection(updatedCollection);
      itemTableStore.setCollection(updatedCollection);
      itemTableStore.setItemConfigModalShown(false);
    }
  };

  const handleModalClose = () => {
    collectionPageStore?.setItemConfigModalOpen(false);
    itemTableStore?.setItemConfigModalShown(false);
  };

  return (
    <Modal
      open={itemTableStore?.itemConfigModalShown ?? collectionPageStore?.itemConfigModalOpen ?? false}
      onClose={handleModalClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          maxHeight: "80%",
          minWidth: "900px",
          maxWidth: "60%",
          width: "fit-content",
        }}>
        <FixedFieldsInputList
          itemConfigStore={itemConfigStore}
          collectionPageStore={collectionPageStore}
        />
        <CustomFieldsInputList itemConfigStore={itemConfigStore} />
        <Button
          onClick={handleClick}
          variant="contained">
          {creatingItem ? "add item" : "edit item"}
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(ItemConfigModal);
