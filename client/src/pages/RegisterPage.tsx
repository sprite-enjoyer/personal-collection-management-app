import { Container, TextField, Button } from "@mui/material";
import { routeBaseStyles } from "../misc/styleUtils";
import RegisterPageStore from "../stores/RegisterPageStore";
import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [registerPageStore] = useState(new RegisterPageStore());
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
          onChange={(e) => registerPageStore.setUserName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          onChange={(e) => registerPageStore.setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          error={registerPageStore.error}
          helperText={registerPageStore.error && "Passwords do not match!"}
          type="password"
          fullWidth
          onChange={(e) => registerPageStore.setPassword(e.target.value)}
        />
        <TextField
          label="Repeat Password"
          type="password"
          error={registerPageStore.error}
          helperText={registerPageStore.error && "Passwords do not match!"}
          fullWidth
          onChange={(e) => registerPageStore.setRepeatPassword(e.target.value)}
        />
        <Button
          sx={{
            marginTop: "20px",
          }}
          size="large"
          variant="contained"
          onClick={() => registerPageStore.handleRegister(navigate)}
          color="primary">
          Register
        </Button>
      </Container>
    </div>
  );
};

export default observer(RegisterPage);
