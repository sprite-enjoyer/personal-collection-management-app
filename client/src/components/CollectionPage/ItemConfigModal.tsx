import { Box, Button, Modal } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { useEffect } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CustomFieldsInputList from "./CustomFieldsInputList";
import ItemTableStore from "../../stores/ItemTableStore";
import { toJS } from "mobx";
import FixedFieldsInputList from "./FixedFieldsInputList";
import { Collection } from "../../misc/types";
import { useThemeContext } from "../../misc/theme";
import { useLanguageContext } from "../../misc/language";

export interface ItemConfigModalProps {
  itemConfigStore: ItemConfigStore;
  creatingItem: boolean;
  editingItemID: string | null;
  collectionPageStore: CollectionPageStore;
  itemTableStore?: ItemTableStore;
  itemConfigModalOpen: boolean;
  setItemConfigModalOpen: (newValue: boolean) => void;
  handleButtonClick: (updatedCollection: Collection) => void;
}

const ItemConfigModal = ({
  collectionPageStore,
  creatingItem,
  editingItemID,
  itemTableStore,
  itemConfigStore,
  itemConfigModalOpen,
  setItemConfigModalOpen,
  handleButtonClick,
}: ItemConfigModalProps) => {
  useEffect(() => {
    if (creatingItem && collectionPageStore)
      itemConfigStore.setAdditionalFields(
        ItemConfigStore.fillAdditionalFieldsWithEmptyValues(collectionPageStore.collection.additionalFieldsInfo)
      );
  }, [collectionPageStore, collectionPageStore?.collection.additionalFieldsInfo]);

  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      ItemConfigModal: { button1Create, button1Edit },
    },
  } = useLanguageContext();

  const handleClick = async () => {
    if (creatingItem && collectionPageStore)
      await itemConfigStore.createItem(collectionPageStore.collection._id, collectionPageStore.collection.owner);
    else if (editingItemID !== null && itemTableStore) await itemConfigStore.editItem(editingItemID);

    const updatedCollection = await CollectionPageStore.fetchCollection(
      itemTableStore?.collection._id ?? collectionPageStore.collection._id
    );
    handleButtonClick(updatedCollection);
  };

  const handleModalClose = () => setItemConfigModalOpen(false);

  return (
    <Modal
      keepMounted={false}
      open={itemConfigModalOpen}
      onClose={handleModalClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
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
          {creatingItem ? button1Create : button1Edit}
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(ItemConfigModal);
