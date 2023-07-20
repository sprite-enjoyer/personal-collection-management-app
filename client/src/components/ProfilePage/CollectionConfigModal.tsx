import { Modal, Box, Container, Button } from "@mui/material";
import { englishTopics } from "../../misc/constants";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { useParams } from "react-router-dom";
import ProfilePageStore from "../../stores/ProfilePageStore";
import CollectionPageStore from "../../stores/CollectionPageStore";
import CustomFieldsList from "./CustomFieldsList";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import DeleteCollectionDialog from "../CollectionPage/DeleteCollectionDialog";
import CollectionConfigModalFixedFields from "./CollectionConfigModalFixedFields";
import CustomFieldCreator from "./CustomFieldCreator";
import { useThemeContext } from "../../misc/theme";
import { useLanguageContext } from "../../misc/language";
import { toJS } from "mobx";

export interface AddCollectionModalProps {
  creatingCollection: boolean;
  profilePageStore?: ProfilePageStore;
  collectionPageStore?: CollectionPageStore;
  collectionConfigModalOpen: boolean;
  setCollectionConfigModalOpen: (newValue: boolean) => void;
}

const CollectionConfigModal = ({
  creatingCollection,
  profilePageStore,
  collectionPageStore,
  collectionConfigModalOpen,
  setCollectionConfigModalOpen,
}: AddCollectionModalProps) => {
  const { userName, collectionID } = useParams() as { userName?: string; collectionID?: string };
  const [collectionConfigStore] = useState(new CollectionConfigStore(creatingCollection, userName, collectionID));
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      CollectionConfigModal: { button2Create, button2Edit },
    },
  } = useLanguageContext();

  useEffect(() => {
    const fillValues = async () => {
      if (!collectionConfigStore.creatingCollection)
        await collectionConfigStore.populateFieldsWithExistingCollectionData();
    };

    fillValues();
  }, []);

  if ((!userName && creatingCollection) || (!collectionID && !creatingCollection)) return null;
  const handleButtonClick = async () => {
    if (creatingCollection) {
      await collectionConfigStore.createCollection();
      const collections = await ProfilePageStore.fetchCollections(profilePageStore?.userName ?? "");
      profilePageStore?.setCollections(collections ?? []);
    } else {
      if (!collectionID) return;
      await collectionConfigStore.editCollection();
      collectionPageStore?.setCollection(await CollectionPageStore.fetchCollection(collectionID));
    }

    setCollectionConfigModalOpen(false);
  };

  console.log(toJS(collectionConfigStore.collection.additionalFieldsInfo));

  return (
    <Modal
      open={collectionConfigModalOpen}
      onClose={() => setCollectionConfigModalOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box sx={{ backgroundColor: theme.palette.background.default, borderRadius: "10px", padding: "50px" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
          }}>
          <CollectionConfigModalFixedFields
            collectionConfigStore={collectionConfigStore}
            topics={englishTopics}
          />
          <CustomFieldCreator collectionConfigStore={collectionConfigStore} />
          <Box
            sx={{
              width: "80%",
              maxHeight: "200px",
              overflow: "auto",
            }}>
            <CustomFieldsList collectionConfigStore={collectionConfigStore} />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            <Button
              variant="contained"
              onClick={handleButtonClick}>
              {creatingCollection ? button2Create : button2Edit}
            </Button>
            {!creatingCollection && (
              <Button
                variant="contained"
                onClick={() => collectionConfigStore.setDeleteCollectionDialogOpen(true)}
                sx={{ position: "absolute", right: "0" }}>
                <DeleteSharpIcon />
              </Button>
            )}
          </Box>
          <DeleteCollectionDialog collectionConfigStore={collectionConfigStore} />
        </Container>
      </Box>
    </Modal>
  );
};

export default observer(CollectionConfigModal);
