import { TextField, Autocomplete, Box, Button } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import CollectionPageStore from "../../stores/CollectionPageStore";
import AddIcon from "@mui/icons-material/Add";
import { KeyboardEventHandler, useRef, useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useThemeContext } from "../../misc/theme";

interface FixedFieldsInputListProps {
  itemConfigStore: ItemConfigStore;
  collectionPageStore?: CollectionPageStore;
}

const FixedFieldsInputList = ({ itemConfigStore, collectionPageStore }: FixedFieldsInputListProps) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useThemeContext();

  const handleTagAddition = () => {
    itemConfigStore.addChosenTag(textFieldValue.trim());
    setTextFieldValue("");
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter" || textFieldValue.length === 0) return;
    handleTagAddition();
  };

  return (
    <>
      <TextField
        value={itemConfigStore.name}
        label="name"
        onChange={(e) => itemConfigStore.setName(e.target.value)}
        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
      />
      <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
        <Autocomplete
          sx={{ flex: "1 1" }}
          multiple
          autoComplete
          autoHighlight
          id="tags"
          limitTags={4}
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
              InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
            />
          )}
        />
        <TextField
          inputRef={inputRef}
          onKeyDown={handleInputKeyDown}
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
          label={"Add a new tag"}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          sx={{ flex: "1 1" }}
          InputProps={{
            endAdornment: (
              <Button onClick={handleTagAddition}>
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
