import { TextField, Autocomplete, Box, Button } from "@mui/material";
import ItemConfigStore from "../../stores/ItemConfigStore";
import AddIcon from "@mui/icons-material/Add";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { toJS, values } from "mobx";
import { observer } from "mobx-react";
import { useThemeContext } from "../../misc/theme";
import { useLanguageContext } from "../../misc/language";
import { fetchAllTags } from "../../pages/MainPage";

interface FixedFieldsInputListProps {
  itemConfigStore: ItemConfigStore;
}

const FixedFieldsInputList = ({ itemConfigStore }: FixedFieldsInputListProps) => {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [autoCompleteInputValue, setAutoCompleteInputValue] = useState("");
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      ItemConfigModal: { inputLabel1, inputLabel2 },
    },
  } = useLanguageContext();

  useEffect(() => {
    const getTags = async () => setAllTags(await fetchAllTags());
    getTags();
  }, [itemConfigStore.editingItemID]);

  const handleTagAddition = (setState: (newValue: string) => void, value: string) => {
    itemConfigStore.addChosenTag(value.trim());
    setState("");
  };

  const handleAutoCompleteKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "Enter" || autoCompleteInputValue.length === 0) return;
    handleTagAddition(setAutoCompleteInputValue, autoCompleteInputValue);
  };

  return (
    <>
      <TextField
        value={itemConfigStore.name}
        label={inputLabel1}
        onChange={(e) => itemConfigStore.setName(e.target.value)}
        InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
        InputProps={{ sx: { color: theme.palette.text.secondary } }}
      />
      <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
        <Autocomplete
          sx={{ flex: "1 1" }}
          multiple
          options={Array.from(new Set([...itemConfigStore.chosenTags, ...allTags]))}
          value={itemConfigStore.chosenTags}
          onKeyDown={handleAutoCompleteKeyDown}
          ChipProps={{ sx: { color: theme.palette.text.primary } }}
          onChange={(_, v) => itemConfigStore.setChosenTags(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={autoCompleteInputValue}
              onChange={(e) => setAutoCompleteInputValue(e.target.value)}
              variant="standard"
              label={inputLabel2}
            />
          )}
        />
      </Box>
    </>
  );
};

export default observer(FixedFieldsInputList);
