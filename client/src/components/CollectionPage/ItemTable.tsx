import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody } from "@mui/material";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";

interface ItemTableProps {
  collectionPageStore: CollectionPageStore;
}

const ItemTable = ({ collectionPageStore }: ItemTableProps) => {
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
            {collectionPageStore.collectionTableColumns.map((column, i) => (
              <TableCell key={column}>
                <Typography>{column}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionPageStore.collection.items.map((item, i) => (
            <TableRow
              hover
              key={item._id}>
              {CollectionPageStore.getCollectionTableRowInformationArray(item).map((value, j) => (
                <TableCell key={i.toString() + j.toString()}>
                  <Typography>{value ? value.toString() : "null"}</Typography>
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
function tosJS(items: import("../../misc/types").Item[]): any {
  throw new Error("Function not implemented.");
}
