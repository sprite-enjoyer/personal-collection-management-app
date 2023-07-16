import { Box, Modal } from "@mui/material";
import HeaderStore from "../../stores/HeaderStore";
import { observer } from "mobx-react";

interface SearchModalProps {
  headerStore: HeaderStore;
}

const SearchModal = ({ headerStore }: SearchModalProps) => {
  return (
    <Modal
      open={headerStore.searchModalOpen}
      onClose={() => headerStore.setSearchModalOpen(false)}>
      <Box></Box>
    </Modal>
  );
};

export default observer(SearchModal);
