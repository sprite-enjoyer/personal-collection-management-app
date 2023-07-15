import { TextField, Autocomplete, Box, Button } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CollectionPageStore from "../../stores/CollectionPageStore";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";

interface FixedFieldsInputListProps {
  itemConfigStore: ItemConfigStore;
  collectionPageStore?: CollectionPageStore;
}

const FixedFieldsInputList = ({ itemConfigStore, collectionPageStore }: FixedFieldsInputListProps) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  return (
    <>
      <TextField
        value={itemConfigStore.name}
        placeholder="name"
        label="name"
        onChange={(e) => itemConfigStore.setName(e.target.value)}
      />
      <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
        <Autocomplete
          sx={{ flex: "1 1" }}
          multiple
          autoComplete
          autoHighlight
          id="tags"
          options={[...itemConfigStore.chosenTags]}
          value={itemConfigStore.chosenTags}
          onChange={(_, v) => itemConfigStore.setChosenTags(v)}
          getOptionLabel={(v) => v}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Item Tags"
              label="Item Tags"
            />
          )}
        />
        <TextField
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
          label={"Add a new tag"}
          sx={{ flex: "1 1" }}
          InputProps={{
            endAdornment: (
              <Button
                onClick={() => {
                  itemConfigStore.addChosenTag(textFieldValue.trim());
                  setTextFieldValue("");
                }}>
                <AddIcon />
              </Button>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default observer(FixedFieldsInputList);
