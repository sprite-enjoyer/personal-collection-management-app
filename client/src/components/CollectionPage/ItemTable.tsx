import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Button,
} from "@mui/material";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemTableStore from "../../stores/ItemTableStore";
import { Collection } from "../../misc/types";

interface ItemTableProps {
  collection: Collection;
}

const ItemTable = ({ collection }: ItemTableProps) => {
  const itemTableStore = new ItemTableStore(collection);

  const deleteButtonHandler = () => {};
  const editButtonHandler = () => {};

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "20px 50px 50px 50px",
        height: "70%",
        minHeight: "500px",
        width: "80%",
        position: "relative",
      }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              width={"50px"}
              height={"50px"}
            />
            <TableCell
              width={"50px"}
              height={"50px"}
            />
            {itemTableStore.collectionTableColumns.map((column, i) => (
              <TableCell
                sx={{ maxWidth: "100px" }}
                key={column}>
                <Typography>{column}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemTableStore.collection.items.map((item, i) => (
            <TableRow
              key={item._id}
              hover
              sx={{ maxHeight: "100px", overflowY: "auto", lineHeight: "100px" }}>
              <TableCell width={"30px"}>
                <Button
                  sx={{ padding: "0", minWidth: "50px", height: "50px" }}
                  onClick={deleteButtonHandler}>
                  <DeleteIcon />
                </Button>
              </TableCell>
              <TableCell width={"30px"}>
                <Button
                  sx={{ padding: "0", minWidth: "50px", height: "50px" }}
                  onClick={editButtonHandler}>
                  <EditIcon />
                </Button>
              </TableCell>

              {ItemTableStore.getCollectionTableRowInformationArray(item).map((value, j) => (
                <TableCell
                  sx={{ maxWidth: "100px", overflow: "auto" }}
                  key={i.toString() + j.toString()}>
                  <Typography maxHeight={"200px"}>{value !== null ? value.toString() : "null"}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(ItemTable);
