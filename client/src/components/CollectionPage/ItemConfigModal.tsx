import { Autocomplete, Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CustomFieldsInputList from "./CustomFieldsInputList";
import ItemTableStore from "../../stores/ItemTableStore";

import { toJS } from "mobx";
import FixedFieldsInputList from "./FixedFieldsInputList";

export interface ItemConfigModalProps {
  itemConfigStore: ItemConfigStore;
  creatingItem: boolean;
  editingItemID: string | null;
  collectionPageStore?: CollectionPageStore;
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

  const handleClick = async () => {
    if (creatingItem && collectionPageStore) {
      await itemConfigStore.createItem(collectionPageStore.collection._id, collectionPageStore.collection.owner);
      collectionPageStore.setItemConfigModalOpen(false);
      const updatedCollection = await CollectionPageStore.fetchCollection(collectionPageStore.collection._id);
      collectionPageStore.setCollection(updatedCollection);
      itemTableStore?.setCollection(updatedCollection);
    } else if (editingItemID !== null && itemTableStore) {
      await itemConfigStore.editItem(editingItemID);
      const updatedCollection = await CollectionPageStore.fetchCollection(itemTableStore?.collection._id);
      itemConfigStore.setCollection(updatedCollection);
      itemTableStore.setCollection(updatedCollection);
      itemTableStore.setItemConfigModalShown(false);
    }
  };

  return (
    <Modal
      open={collectionPageStore?.itemConfigModalOpen ?? itemTableStore?.itemConfigModalShown ?? false}
      onClose={() => {
        collectionPageStore?.setItemConfigModalOpen(false);
        itemTableStore?.setItemConfigModalShown(false);
      }}
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
          width: "60%",
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
