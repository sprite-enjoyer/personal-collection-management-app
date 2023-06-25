import { useParams } from "react-router-dom";
import { routeBaseStyles } from "../misc/styleUtils";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProfilePageStore from "../stores/ProfilePageStore";
import { observer } from "mobx-react";
import { topics } from "../misc/constants";
import AddCollectionModal from "../components/ProfileRoute/AddCollectionModal";

const ProfilePage = () => {
  const [profilePageStore] = useState(new ProfilePageStore());
  return (
    <div style={{ ...routeBaseStyles, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          outline: "2px solid plum",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            gap: "20px",
          }}>
          <Typography variant="h3">Your collections</Typography>
          <AddCollectionModal
            buttonText="add collection"
            creatingCollection={true}
          />
        </Box>
        <Container
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
        </Container>
      </Container>
    </div>
  );
};

export default observer(ProfilePage);
