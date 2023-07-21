import { Container, TextField, Button, Box } from "@mui/material";
import { routeBaseStyles } from "../misc/styleUtils";
import RegisterPageStore from "../stores/RegisterPageStore";
import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../misc/theme";
import { useLanguageContext } from "../misc/language";

const RegisterPage = () => {
  const [registerPageStore] = useState(new RegisterPageStore());
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const {
    staticTextObject: {
      RegisterPage: { inputLabel1, inputLabel2, inputLabel3, inputLabel4, button },
    },
  } = useLanguageContext();

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
          error={registerPageStore.errorTexts.userName.length !== 0}
          helperText={registerPageStore.errorTexts.userName}
          label={inputLabel1}
          fullWidth
          onChange={(e) => registerPageStore.setUserName(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <TextField
          error={registerPageStore.errorTexts.email.length !== 0}
          helperText={registerPageStore.errorTexts.email}
          label={inputLabel2}
          type="email"
          fullWidth
          onChange={(e) => registerPageStore.setEmail(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <TextField
          error={registerPageStore.errorTexts.password.length !== 0}
          helperText={registerPageStore.errorTexts.password}
          label={inputLabel3}
          type="password"
          fullWidth
          onChange={(e) => registerPageStore.setPassword(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <TextField
          error={registerPageStore.errorTexts.repeatPassword.length !== 0}
          helperText={registerPageStore.errorTexts.repeatPassword}
          label={inputLabel4}
          type="password"
          fullWidth
          onChange={(e) => registerPageStore.setRepeatPassword(e.target.value)}
          InputLabelProps={{ sx: { color: theme.palette.text.secondary } }}
          InputProps={{ sx: { color: theme.palette.text.primary } }}
        />
        <Button
          sx={{
            marginTop: "20px",
          }}
          size="large"
          variant="contained"
          onClick={() => registerPageStore.handleRegister(navigate)}
          color="primary">
          {button}
        </Button>
      </Container>
    </Box>
  );
};

export default observer(RegisterPage);
