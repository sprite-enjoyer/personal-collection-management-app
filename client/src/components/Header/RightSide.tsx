import { Box, Button, Divider, FormControlLabel, IconButton, Switch, Typography } from "@mui/material";
import HeaderStore from "../../stores/HeaderStore";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../misc/theme";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../misc/language";
interface RightSideProps {
  headerStore: HeaderStore;
}

const RightSide = ({ headerStore }: RightSideProps) => {
  const { mode, theme, toggleColorMode } = useThemeContext();
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"5px"}>
      <IconButton
        color="primary"
        onClick={toggleColorMode}
        sx={{ aspectRatio: "1", width: "40px", height: "40px" }}>
        {mode === "dark" ? (
          <DarkModeIcon sx={{ aspectRatio: "1", width: "40px" }} />
        ) : (
          <LightModeIcon sx={{ aspectRatio: "1", width: "40px" }} />
        )}
      </IconButton>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}>
        <Typography color={theme.palette.text.primary}>{language.substring(0, 3)}</Typography>
        <Switch
          onChange={(_, checked) => {
            if (checked) setLanguage("ქართული");
            else setLanguage("English");
          }}
        />
      </Box>
      <IconButton
        onClick={() => headerStore.setSearchModalOpen(true)}
        sx={{ width: "40px", height: "40px", aspectRatio: "1" }}>
        <SearchIcon
          sx={{ width: "40px", aspectRatio: "1" }}
          color="primary"
        />
      </IconButton>
    </Box>
  );
};

export default RightSide;
