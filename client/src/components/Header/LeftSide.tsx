import { observer } from "mobx-react";
import GlobalUserInfoStore from "../../stores/GlobalUserInfoStore";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useThemeContext } from "../../misc/theme";
interface LeftSideProps {
  globalUserInfoStore: GlobalUserInfoStore;
}

const LeftSide = ({ globalUserInfoStore }: LeftSideProps) => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      gap={"10px"}>
      <IconButton
        size="large"
        onClick={() => navigate("/")}
        sx={{ width: "50px", height: "50px" }}>
        <HomeIcon
          color={"primary"}
          sx={{ width: "50px", aspectRatio: "1" }}
        />
      </IconButton>
      {globalUserInfoStore.loggedIn ? (
        <Box
          display={"flex"}
          gap={"15px"}>
          <IconButton
            sx={{ width: "50px", height: "50px" }}
            onClick={async () => await globalUserInfoStore.signOut(globalUserInfoStore)}>
            <LogoutIcon
              color={"primary"}
              sx={{ width: "50px", aspectRatio: "1" }}
            />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => navigate(`/user/${globalUserInfoStore.userName}`)}
            sx={{ width: "50px", height: "50px" }}>
            <AccountCircle
              color={"primary"}
              sx={{ width: "50px", aspectRatio: "1" }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box
          display={"flex"}
          gap={"10px"}>
          <Button onClick={() => navigate("/login")}>login</Button>
          <Button onClick={() => navigate("/register")}>register</Button>
        </Box>
      )}
    </Box>
  );
};

export default observer(LeftSide);
