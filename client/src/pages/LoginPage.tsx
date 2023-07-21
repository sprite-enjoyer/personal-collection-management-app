import { Container, TextField, Button, Box } from "@mui/material";
import { routeBaseStyles } from "../misc/styleUtils";
import LoginPageStore from "../stores/LoginPageStore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalUserInfoStoreContext } from "../App";
import { useThemeContext } from "../misc/theme";
import { useLanguageContext } from "../misc/language";

const LoginPage = () => {
  const [loginPageStore] = useState(new LoginPageStore());
  const navigate = useNavigate();
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      LoginPage: { inputLabel1, inputLabel2, button },
    },
  } = useLanguageContext();

  const hanldeLoginButtonClick = () => {
    globalUserInfoStore.setUserChecked(true);
    loginPageStore.handleLogin(navigate, globalUserInfoStore);
  };

  return (
    <Box
      style={{
        ...routeBaseStyles,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Container
        sx={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}>
        <TextField
          label={inputLabel1}
          fullWidth
          onChange={(e) => loginPageStore.setUserName(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <TextField
          label={inputLabel2}
          type="password"
          fullWidth
          onChange={(e) => loginPageStore.setPassword(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <Button
          sx={{
            marginTop: "20px",
          }}
          size="large"
          variant="contained"
          onClick={hanldeLoginButtonClick}
          color="primary">
          {button}
        </Button>
      </Container>
    </Box>
  );
};

export default LoginPage;
