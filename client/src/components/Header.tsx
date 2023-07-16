import { AppBar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import HeaderStore from "../stores/HeaderStore";
import { useEffect, useState } from "react";
import { routeBaseStyles } from "../misc/styleUtils";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { AccountCircle } from "@mui/icons-material";
import { GlobalUserInfoStoreContext } from "../App";
import { useContext } from "react";
import SearchModal from "./Header/SearchModal";
import SearchIcon from "@mui/icons-material/Search";
import LeftSide from "./Header/LeftSide";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [headerStore] = useState(new HeaderStore());
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.ctrlKey && event.key === "k") headerStore.setSearchModalOpen(true);
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  });

  return (
    <>
      <SearchModal headerStore={headerStore} />
      <Box sx={{ ...routeBaseStyles, display: "flex", flexDirection: "column", gap: "20px" }}>
        <AppBar
          sx={{
            height: "70px",
            margin: "0",
            width: "100vw",
            position: "sticky",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            padding: "2px 20px 2px 20px",
            gap: "20px",
          }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}>
            <LeftSide globalUserInfoStore={globalUserInfoStore} />
            <Box>
              <IconButton
                onClick={() => headerStore.setSearchModalOpen(true)}
                sx={{ aspectRatio: "1", borderRadius: "50%", width: "50px", height: "50px" }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </AppBar>
        <Outlet />
      </Box>
    </>
  );
};

export default observer(Header);
