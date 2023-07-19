import { Box, Button, Divider, IconButton } from "@mui/material";
import HeaderStore from "../../stores/HeaderStore";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../misc/theme";
import useColorTheme from "../../misc/useColorTheme";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
interface RightSideProps {
  headerStore: HeaderStore;
}

const RightSide = ({ headerStore }: RightSideProps) => {
  const { mode, theme, toggleColorMode } = useThemeContext();
  return (
    <Box
      display={"flex"}
      gap={"10px"}>
      <IconButton
        color="primary"
        onClick={toggleColorMode}
        sx={{ aspectRatio: "1" }}>
        {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <IconButton sx={{ aspectRatio: "1" }}>
        <Link
          to={"https://github.com/sprite-enjoyer/personal-collection-management-app"}
          target="_blank">
          <GitHubIcon sx={{ color: mode === "dark" ? "white" : "black" }} />
        </Link>
      </IconButton>
      <Button>
        <Box
          display={"flex"}
          gap={"10px"}
          color={theme.palette.text.primary}>
          English
          <LanguageIcon />
        </Box>
      </Button>
      <Box
        sx={{
          backgroundColor: mode === "dark" ? "#2e333b" : "#acaeb0",
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
    </Box>
  );
};

export default RightSide;
