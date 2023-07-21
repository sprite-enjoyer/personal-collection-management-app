import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";
import { useThemeContext } from "../../misc/theme";
import { useLanguageContext } from "../../misc/language";
import ImageUploader from "./ImageUploader";

interface CollectionConfigModalFixedFieldsProps {
  collectionConfigStore: CollectionConfigStore;
  topics: string[];
}

const CollectionConfigModalFixedFields = ({ collectionConfigStore, topics }: CollectionConfigModalFixedFieldsProps) => {
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      CollectionConfigModal: { inputLabel1, inputLabel2, inputLabel3, inputLabel4 },
    },
  } = useLanguageContext();

  return (
    <>
      <TextField
        fullWidth
        label={inputLabel1}
        type="text"
        value={collectionConfigStore.collection.name}
        onChange={(e) => collectionConfigStore.setCollectionName(e.target.value)}
        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
        InputProps={{ sx: { color: theme.palette.text.primary } }}
      />
      <TextField
        fullWidth
        label={inputLabel2}
        multiline
        value={collectionConfigStore.collection.description}
        type="text"
        onChange={(e) => collectionConfigStore.setCollectionDescription(e.target.value)}
        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
        InputProps={{ sx: { color: theme.palette.text.primary } }}
      />
      <ImageUploader collectionConfigStore={collectionConfigStore} />
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          sx={{ color: theme.palette.text.secondary, backgroundColor: theme.palette.background.default }}
          id="select-topic">
          {inputLabel3}
        </InputLabel>
        <Select
          onChange={(e) => collectionConfigStore.setCollectionTopic(e.target.value)}
          labelId="select-topic"
          value={collectionConfigStore.collection.topic}
          defaultValue="Other"
          inputProps={{
            sx: { color: theme.palette.text.secondary },
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: "gray",
                },
              },
            },
          }}>
          {topics.map((topic, i) => (
            <MenuItem
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.secondary,
                ":hover": { backgroundColor: "gray" },
              }}
              key={i}
              value={topic}>
              <Typography>{topic}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default observer(CollectionConfigModalFixedFields);
