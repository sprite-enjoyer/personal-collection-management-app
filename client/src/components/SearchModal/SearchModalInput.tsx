import { Box, TextField, IconButton, Chip } from "@mui/material";
import SearchModalStore from "../../stores/SearchModalStore";
import { observer } from "mobx-react";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef } from "react";

interface SearchModalInputProps {
  searchModalStore: SearchModalStore;
}

const SearchModalInput = ({ searchModalStore }: SearchModalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const search = async () => {
    if (searchModalStore.textFieldValue.length === 0) return;
    searchModalStore.addSearchvalue(searchModalStore.textFieldValue);
    searchModalStore.setTextFieldValue("");
    await searchModalStore.fetchResults();
  };

  const handleSearchValueAdd = async () => {
    await search();
  };

  const handleSearchValueRemove = async (value: string) => {
    searchModalStore.removeSearchValue(value);
    await searchModalStore.fetchResults();
  };

  const handleTextFieldKeyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    if (e.key !== "Enter" || searchModalStore.textFieldValue.length === 0) return;
    await search();
  };

  return (
    <Box sx={{ display: "flex", maxwidth: "100%", gap: "20px", alignItems: "center" }}>
      <TextField
        inputRef={inputRef}
        onKeyDown={handleTextFieldKeyDown}
        sx={{ width: "50%" }}
        value={searchModalStore.textFieldValue}
        onChange={(e) => searchModalStore.setTextFieldValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearchValueAdd}>
              <AddIcon />
            </IconButton>
          ),
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          overflow: "auto",
          maxWidth: "50%",
          maxHeight: "80px",
          backgroundColor: "#ededed",
          width: "50%",
          minHeight: "50px",
          borderRadius: "5px",
          padding: "5px",
        }}>
        {searchModalStore.searchValues.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleSearchValueRemove(value)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default observer(SearchModalInput);
