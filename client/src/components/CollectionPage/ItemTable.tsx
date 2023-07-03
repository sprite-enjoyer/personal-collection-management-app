import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  TableBody,
  Button,
} from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";

interface ItemTableProps {
  collectionPageStore: CollectionPageStore;
}

const ItemTable = ({ collectionPageStore }: ItemTableProps) => {
  return (
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
              <Checkbox onChange={undefined} />
            </TableCell>
            {collectionPageStore.collectionTableColumns.map((column, i) => (
              <TableCell key={column}>
                <Typography>{column}</Typography>
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionPageStore.collectionTableRows.map((item, i) => (
            <TableRow key={item._id}>
              {CollectionPageStore.getCollectionTableRowInformationArray(item).map((value, j) => (
                <TableCell key={i.toString().concat(j.toString())}>
                  <Typography>{value.toString()}</Typography>
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
