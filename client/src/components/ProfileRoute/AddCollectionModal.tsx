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
import { useState } from "react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { CustomFieldType } from "../../misc/types";

export interface AddCollectionModalProps {
  buttonText: string;
  creatingCollection: boolean;
}

const AddCollectionModal = ({ buttonText, creatingCollection }: AddCollectionModalProps) => {
  const [collectionConfigStore] = useState(new CollectionConfigStore());

  const handleButtonClick = () => {
    if (creatingCollection) collectionConfigStore.createCollection();
    else collectionConfigStore.editCollection();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
        }}
        onClick={() => collectionConfigStore.setModalOpen(true)}>
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
              onChange={(e) => collectionConfigStore.setCollectionName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              type="text"
              onChange={(e) => collectionConfigStore.setCollectionDescription(e.target.value)}
            />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="select-topic">Topic</InputLabel>
              <Select
                onChange={(e) => collectionConfigStore.setCollectionTopic(e.target.value)}
                labelId="select-topic"
                label="Topic"
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
                value={collectionConfigStore.customFieldToBeAdded.name}
              />
              <FormControl>
                <InputLabel id="field-type">Type</InputLabel>
                <Select
                  onChange={(e) => collectionConfigStore.setCustomFieldToBeAddedType(e.target.value as CustomFieldType)}
                  labelId="field-type"
                  label="Type"
                  value={collectionConfigStore.customFieldToBeAdded.type}
                  defaultValue="string">
                  {["string", "multiline", "number", "boolean", "date"].map((type, i) => (
                    <MenuItem
                      value={type}
                      key={i}>
                      <Typography>{type}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
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
              {collectionConfigStore.customFields.map((field, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Box sx={{ flex: "1 1", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <Typography fontSize={"1.2em"}>{field.name}:</Typography>
                  </Box>
                  <Box sx={{ flex: "1 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography fontSize={"1.2em"}>{field.type}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button onClick={handleButtonClick}>{buttonText}</Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default observer(AddCollectionModal);
