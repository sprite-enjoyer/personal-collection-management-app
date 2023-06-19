import { Container, TextField, Button } from "@mui/material";
import { routeBaseStyles } from "../misc/styleUtils";
import LoginPageStore from "../stores/LoginPageStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginPageStore] = useState(new LoginPageStore());
  const navigate = useNavigate();

  return (
    <div
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
          label="Username"
          fullWidth
          onChange={(e) => loginPageStore.setUserName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => loginPageStore.setPassword(e.target.value)}
        />
        <Button
          sx={{
            marginTop: "20px",
          }}
          size="large"
          variant="contained"
          onClick={() => loginPageStore.handleLogin(navigate)}
          color="primary">
          Register
        </Button>
      </Container>
    </div>
  );
};

export default LoginPage;
