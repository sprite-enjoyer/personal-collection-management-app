import { Box, Button, Divider } from "@mui/material";
import HeaderStore from "../../stores/HeaderStore";
import SearchIcon from "@mui/icons-material/Search";

interface RightSideProps {
  headerStore: HeaderStore;
}

const RightSide = ({ headerStore }: RightSideProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#d9d9d9",
        boxSizing: "border-box",
        borderRadius: "5px",
      }}
      borderRadius={"5px"}
      boxSizing={"border-box"}
      display={"flex"}
      gap={"20px"}
      width={"80px"}
      alignItems={"center"}>
      <Button
        fullWidth
        onClick={() => headerStore.setSearchModalOpen(true)}
        sx={{ margin: "0", padding: "0", display: "flex", height: "100%", fontWeight: "500" }}>
        <SearchIcon sx={{ flex: "1 1" }} />
        <Divider
          orientation="vertical"
          flexItem
        />
        <kbd style={{ fontSize: "1.5em", flex: "1 1" }}>
          <span>⌃</span>
          <span>K</span>
        </kbd>
      </Button>
    </Box>
  );
};

export default RightSide;
