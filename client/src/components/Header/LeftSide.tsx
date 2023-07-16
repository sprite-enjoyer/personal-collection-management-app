import { observer } from "mobx-react";
import GlobalUserInfoStore from "../../stores/GlobalUserInfoStore";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

interface LeftSideProps {
  globalUserInfoStore: GlobalUserInfoStore;
}

const LeftSide = ({ globalUserInfoStore }: LeftSideProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      {globalUserInfoStore.loggedIn ? (
        <Box
          display={"flex"}
          gap={"15px"}>
          <IconButton
            size="large"
            onClick={() => navigate(`/user/${globalUserInfoStore.userName}`)}
            sx={{ aspectRatio: "1", borderRadius: "50%", width: "50px", height: "50px" }}>
            <AccountCircle />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
          <Button onClick={async () => await globalUserInfoStore.signOut(globalUserInfoStore)}>sign out</Button>
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
