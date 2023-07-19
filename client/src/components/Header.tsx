import { AppBar, Box } from "@mui/material";
import HeaderStore from "../stores/HeaderStore";
import { useEffect, useState } from "react";
import { routeBaseStyles } from "../misc/styleUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { GlobalUserInfoStoreContext } from "../App";
import { useContext } from "react";
import SearchModal from "./SearchModal";
import LeftSide from "./Header/LeftSide";
import RightSide from "./Header/RightSide";
import useColorTheme from "../misc/useColorTheme";
import { useThemeContext } from "../misc/theme";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [headerStore] = useState(new HeaderStore());
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const { theme } = useThemeContext();

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        headerStore.setSearchModalOpen(!headerStore.searchModalOpen);
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  });

  return (
    <>
      <SearchModal
        open={headerStore.searchModalOpen}
        onCloseCallback={() => headerStore.setSearchModalOpen(false)}
        initialSearchValues={[]}
      />
      <Box
        sx={{
          ...routeBaseStyles,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: theme.palette.background.default,
        }}>
        <AppBar
          sx={{
            height: "70px",
            margin: "0",
            width: "100vw",
            position: "sticky",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            padding: "2px 20px 2px 20px",
            gap: "20px",
          }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}>
            <LeftSide globalUserInfoStore={globalUserInfoStore} />
            <RightSide headerStore={headerStore} />
          </Box>
        </AppBar>
        <Outlet />
      </Box>
    </>
  );
};

export default observer(Header);
