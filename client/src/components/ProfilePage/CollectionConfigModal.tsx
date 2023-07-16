import {
  Modal,
  Box,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { topics } from "../../misc/constants";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { AdditionalFieldTypeString } from "../../misc/types";
import { useParams } from "react-router-dom";
import ProfilePageStore from "../../stores/ProfilePageStore";
import CollectionPageStore from "../../stores/CollectionPageStore";
import CustomFieldsList from "./CustomFieldsList";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { GlobalUserInfoStoreContext } from "../../App";
import DeleteCollectionDialog from "../CollectionPage/DeleteCollectionDialog";
export interface AddCollectionModalProps {
  buttonText: string;
  creatingCollection: boolean;
  profilePageStore?: ProfilePageStore;
  collectionPageStore?: CollectionPageStore;
}

const CollectionConfigModal = ({
  buttonText,
  creatingCollection,
  profilePageStore,
  collectionPageStore,
}: AddCollectionModalProps) => {
  const { userName, collectionID } = useParams() as { userName?: string; collectionID?: string };
  if ((!userName && creatingCollection) || (!collectionID && !creatingCollection)) return null;
  const [collectionConfigStore] = useState(new CollectionConfigStore(creatingCollection, userName, collectionID));
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);

  useEffect(() => {
    const fillValues = async () => {
      if (!collectionConfigStore.creatingCollection)
        await collectionConfigStore.populateFieldsWithExistingCollectionData();
    };

    fillValues();
  }, []);

  const handleButtonClick = async () => {
    if (creatingCollection) {
      await collectionConfigStore.createCollection();
      profilePageStore?.fetchCollections();
    } else {
      if (!collectionID) return;
      await collectionConfigStore.editCollection();
      collectionPageStore?.setCollection(await CollectionPageStore.fetchCollection(collectionID));
    }

    collectionConfigStore.handleModalClose();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
        }}
        onClick={async () => {
          await collectionConfigStore.populateFieldsWithExistingCollectionData();
          collectionConfigStore.setModalOpen(true);
        }}>
        {buttonText}
      </Button>
      <Modal
        open={collectionConfigStore.modalOpen}
        onClose={() => collectionConfigStore.handleModalClose()}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "50px" }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
            }}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              value={collectionConfigStore.collectionName}
              onChange={(e) => collectionConfigStore.setCollectionName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              value={collectionConfigStore.collectionDescription}
              type="text"
              onChange={(e) => collectionConfigStore.setCollectionDescription(e.target.value)}
            />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="select-topic">Topic</InputLabel>
              <Select
                onChange={(e) => collectionConfigStore.setCollectionTopic(e.target.value)}
                labelId="select-topic"
                label="Topic"
                value={collectionConfigStore.collectionTopic}
                defaultValue="Other">
                {topics.map((topic, i) => (
                  <MenuItem
                    key={i}
                    value={topic}>
                    <Typography>{topic}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}>
              <TextField
                onChange={(e) => collectionConfigStore.setCustomFieldToBeAddedName(e.target.value)}
                placeholder="Name"
                value={collectionConfigStore.additionalFieldToBeAddedName}
              />
              <FormControl>
                <InputLabel id="field-type">Type</InputLabel>
                <Select
                  onChange={(e) =>
                    collectionConfigStore.setCustomFieldToBeAddedType(e.target.value as AdditionalFieldTypeString)
                  }
                  labelId="field-type"
                  label="Type"
                  value={collectionConfigStore.additionalFieldToBeAddedType}
                  defaultValue="string">
                  {["string", "multiline", "integer", "boolean", "date"].map((type, i) => (
                    <MenuItem
                      value={type}
                      key={i}>
                      <Typography>{type}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                onClick={() => collectionConfigStore.addCustomField()}>
                add custom field
              </Button>
            </Box>
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
                {buttonText}
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
    </>
  );
};

export default observer(CollectionConfigModal);
