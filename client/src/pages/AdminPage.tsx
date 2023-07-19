import { useCallback, useContext, useMemo, useState } from "react";
import AdminPageStore from "../stores/AdminPageStore";
import { observer } from "mobx-react";
import { routeBaseStyles } from "../misc/styleUtils";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { User } from "../misc/types";
import { Navigate, useNavigate } from "react-router-dom";
import { GlobalUserInfoStoreContext } from "../App";
import { useThemeContext } from "../misc/theme";

export interface AdminPageProps {}

const AdminPage = ({}: AdminPageProps) => {
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const [adminPageStore] = useState(new AdminPageStore());
  const navigate = useNavigate();
  const { theme, mode } = useThemeContext();

  if (!globalUserInfoStore.isAdmin) return <Navigate to={"/login"} />;
  const Columns = useCallback(() => {
    const firstUser = adminPageStore.users[0];
    if (!firstUser) return null;
    const keys = Object.keys(firstUser).filter((key) => key !== "collections");
    return (
      <>
        {keys.map((column) => (
          <TableCell
            sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
            key={column}>
            <Typography>{column}</Typography>
          </TableCell>
        ))}
      </>
    );
  }, [adminPageStore.users, mode, theme]);

  const Rows = useCallback(() => {
    const users = adminPageStore.users.map((user) => {
      const { collections, ...rest } = user;
      return rest;
    });

    return (
      <>
        {adminPageStore.users.map((user, i) => (
          <TableRow key={user.username + i.toString()}>
            <TableCell>
              <Checkbox
                checked={shouldRowCheckboxBeChecked(user.id)}
                onChange={(e) => handleUserCheckboxChange(e, user)}
              />
            </TableCell>
            {Object.values(users[i]).map((value, i) => (
              <TableCell
                sx={{ color: theme.palette.text.primary }}
                key={user.id + i}>
                <Typography>{value.toString()}</Typography>
              </TableCell>
            ))}
            <TableCell>
              <Button
                variant="outlined"
                onClick={() => navigate(`/user/${user.username}`)}>
                Visit User
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }, [adminPageStore.users, mode, theme]);

  const handleUserCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, user: User) => {
    const { checked } = e.target;
    if (checked) adminPageStore.setSelectedUsers([...adminPageStore.selectedUsers, user]);
    else adminPageStore.setSelectedUsers(adminPageStore.selectedUsers.filter((u) => u.id !== user.id));
  };

  const handleHeaderCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) adminPageStore.setSelectedUsers(adminPageStore.users);
    else adminPageStore.setSelectedUsers([]);
  };

  const shouldRowCheckboxBeChecked = (userID: string) => {
    return adminPageStore.selectedUsers.map((u) => u.id).includes(userID);
  };

  return (
    <Box style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <TableContainer
        component={Paper}
        sx={{
          margin: "50px",
          height: "700px",
          width: "1500px",
          backgroundColor: theme.palette.background.default,
        }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: theme.palette.background.default }}>
                <Checkbox onChange={handleHeaderCheckboxChange} />
              </TableCell>
              <Columns />
              <TableCell sx={{ backgroundColor: theme.palette.background.default }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Rows />
          </TableBody>
        </Table>
      </TableContainer>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
        <Button
          variant="contained"
          onClick={() => adminPageStore.changeSelectedUsers(true, null)}>
          block
        </Button>
        <Button
          variant="contained"
          onClick={() => adminPageStore.changeSelectedUsers(false, null)}>
          unblock
        </Button>
        <Button
          variant="contained"
          onClick={() => adminPageStore.deleteSelectedUsers()}>
          delete
        </Button>
        <Button
          variant="contained"
          onClick={() => adminPageStore.changeSelectedUsers(null, true)}>
          give admin permissions
        </Button>
        <Button
          variant="contained"
          onClick={() => adminPageStore.changeSelectedUsers(null, false)}>
          remove admin permissions
        </Button>
      </Container>
    </Box>
  );
};

export default observer(AdminPage);
