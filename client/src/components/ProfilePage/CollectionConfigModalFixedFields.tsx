import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import CollectionConfigStore from "../../stores/CollectionConfigStore";

interface CollectionConfigModalFixedFieldsProps {
  collectionConfigStore: CollectionConfigStore;
  topics: string[];
}

const CollectionConfigModalFixedFields = ({ collectionConfigStore, topics }: CollectionConfigModalFixedFieldsProps) => {
  return (
    <>
      <TextField
        fullWidth
        label="Name"
        type="text"
        value={collectionConfigStore.collection.name}
        onChange={(e) => collectionConfigStore.setCollectionName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        value={collectionConfigStore.collection.description}
        type="text"
        onChange={(e) => collectionConfigStore.setCollectionDescription(e.target.value)}
      />
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="select-topic">Topic</InputLabel>
        <Select
          onChange={(e) => collectionConfigStore.setCollectionTopic(e.target.value)}
          labelId="select-topic"
          label="Topic"
          value={collectionConfigStore.collection.topic}
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
    </>
  );
};

export default observer(CollectionConfigModalFixedFields);
