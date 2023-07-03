import { useEffect, useMemo, useState } from "react";
import AdminPageStore from "../stores/AdminPageStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { routeBaseStyles } from "../misc/styleUtils";
import {
  Button,
  Checkbox,
  Container,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { User } from "../misc/types";
import { useNavigate } from "react-router-dom";

export interface AdminPageProps {}

const AdminPage = ({}: AdminPageProps) => {
  const [adminPageStore] = useState(new AdminPageStore());
  const navigate = useNavigate();
  const columns = useMemo(() => {
    const firstUser = adminPageStore.users[0];
    if (!firstUser) return [];
    const keys = Object.keys(firstUser);
    return keys;
  }, [adminPageStore.users]);

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
    <div style={{ ...routeBaseStyles, display: "flex", alignItems: "center", flexDirection: "column" }}>
      <TableContainer
        component={Paper}
        sx={{
          margin: "50px",
          height: "700px",
          width: "1500px",
        }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox onChange={handleHeaderCheckboxChange} />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column}>
                  <Typography>{column}</Typography>
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminPageStore.users.map((user) => (
              <TableRow key={user.userName}>
                <TableCell>
                  <Checkbox
                    checked={shouldRowCheckboxBeChecked(user.id)}
                    onChange={(e) => handleUserCheckboxChange(e, user)}
                  />
                </TableCell>
                {Object.values(user).map((value, i) => (
                  <TableCell key={user.id + i}>
                    <Typography>{value.toString()}</Typography>
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/user/${user.userName}`)}>
                    Visit User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  );
};

export default observer(AdminPage);
