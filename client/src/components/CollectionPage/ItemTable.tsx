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
import { Collection, Item } from "../../misc/types";
import { useEffect, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import ItemConfigModal from "./ItemConfigModal";
import MDEditor from "@uiw/react-md-editor";

interface ItemTableProps {
  collection: Collection;
}

const ItemTable = ({ collection }: ItemTableProps) => {
  const [itemTableStore] = useState(new ItemTableStore(collection));
  const [itemConfigStore] = useState(new ItemConfigStore(collection));

  const deleteButtonHandler = async (id: string) => {
    await itemTableStore.deleteItem(id);
  };

  const editButtonHandler = (item: Item) => {
    itemTableStore.setItemConfigModalShown(true);
    itemConfigStore.setName(item.name);
    itemConfigStore.setAdditionalFields([
      ...item.additionalFields.map((field) => {
        return { ...field };
      }),
    ]);
    itemConfigStore.setEditingItemID(item._id);
  };

  return (
    <>
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
                    onClick={() => deleteButtonHandler(item._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell width={"30px"}>
                  <Button
                    sx={{ padding: "0", minWidth: "50px", height: "50px" }}
                    onClick={() => editButtonHandler(item)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                {ItemTableStore.getCollectionTableRowInformationArray(item).map((info, j) => (
                  <TableCell
                    sx={{ maxWidth: "100px", overflow: "auto" }}
                    key={i.toString() + j.toString()}>
                    {info.type !== "multiline" ? (
                      <Typography maxHeight={"200px"}>
                        {info.value !== null ? info.value.toString() : "null"}
                      </Typography>
                    ) : (
                      <MDEditor.Markdown source={info.value as string} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ItemConfigModal
        editingItemID={itemConfigStore.editingItemID}
        itemConfigStore={itemConfigStore}
        creatingItem={false}
        itemTableStore={itemTableStore}
      />
    </>
  );
};

export default observer(ItemTable);
