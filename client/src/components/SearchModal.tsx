import { Box, Modal, Typography } from "@mui/material";
import { observer } from "mobx-react";
import SearchModalStore from "../stores/SearchModalStore";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import SearchModalInput from "./SearchModal/SearchModalInput";
import ItemCard from "./MainPage/ItemCard";

export interface SearchModalProps {
  initialSearchValues: string[];
  open: boolean;
  onCloseCallback: () => void;
}

const SearchModal = ({ initialSearchValues, open, onCloseCallback }: SearchModalProps) => {
  const [searchModalStore] = useState(new SearchModalStore());

  useEffect(() => {
    searchModalStore.setSearchValues(initialSearchValues);
    const getSearchedItems = async () => {
      if (initialSearchValues.length !== 0) await searchModalStore.fetchResults();
    };
    getSearchedItems();
  }, [initialSearchValues]);

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
        border: "none",
      }}
      open={open}
      onClose={() => {
        onCloseCallback();
        searchModalStore.setSearchValues([]);
        searchModalStore.setResults([]);
      }}>
      <Box
        sx={{
          borderRadius: "5px",
          backgroundColor: "white",
          minWidth: "max(400px, 50%)",
          minHeight: "max(500px, 70%)",
          maxHeight: "600px",
          padding: "20px",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          overflow: "auto",
        }}>
        <SearchModalInput searchModalStore={searchModalStore} />
        {searchModalStore.results.length !== 0 && <Typography variant="h6">Results:</Typography>}
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          width={"100%"}
          gap={"10px 30px"}
          alignItems={"center"}
          justifyContent={"center"}>
          {searchModalStore.results.map((item) => (
            <ItemCard
              styles={{
                width: "min(100%, 500px)",
                maxWidth: "min(100%, 500px)",
              }}
              item={item}
              key={item._id}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(SearchModal);
