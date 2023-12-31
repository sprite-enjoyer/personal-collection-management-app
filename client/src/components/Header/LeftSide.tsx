import { observer } from "mobx-react";
import GlobalUserInfoStore from "../../stores/GlobalUserInfoStore";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLanguageContext } from "../../misc/language";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
interface LeftSideProps {
  globalUserInfoStore: GlobalUserInfoStore;
}

const LeftSide = ({ globalUserInfoStore }: LeftSideProps) => {
  const navigate = useNavigate();
  const {
    staticTextObject: {
      Header: { login, register },
    },
  } = useLanguageContext();

  return (
    <Box
      display={"flex"}
      gap={"5px"}
      alignItems={"center"}>
      {globalUserInfoStore.user ? (
        <Box
          display={"flex"}
          gap={"5px"}>
          <IconButton
            sx={{ width: "40px", height: "40px", aspectRatio: "1" }}
            onClick={async () => await globalUserInfoStore.signOut(globalUserInfoStore)}>
            <LogoutIcon
              color={"primary"}
              sx={{ width: "40px", aspectRatio: "1" }}
            />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => navigate(`/user/${globalUserInfoStore.user?.username}`)}
            sx={{ width: "40px", height: "40px", aspectRatio: "1" }}>
            <AccountCircle
              color={"primary"}
              sx={{ width: "40px", aspectRatio: "1" }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}>
          <Button
            size="small"
            onClick={() => navigate("/login")}>
            {login}
          </Button>
          <Button
            size="small"
            onClick={() => navigate("/register")}>
            {register}
          </Button>
        </Box>
      )}
      {globalUserInfoStore.user?.isAdmin && (
        <IconButton
          onClick={() => navigate("/admin")}
          sx={{ width: "40px", height: "40px", aspectRatio: "1" }}>
          <AdminPanelSettingsIcon
            color={"primary"}
            sx={{ width: "40px", aspectRatio: "1" }}
          />
        </IconButton>
      )}
      <IconButton
        size="large"
        onClick={() => navigate("/")}
        sx={{ width: "40px", height: "40px", aspectRatio: "1" }}>
        <HomeIcon
          color={"primary"}
          sx={{ width: "40px", aspectRatio: "1" }}
        />
      </IconButton>
    </Box>
  );
};

export default observer(LeftSide);
