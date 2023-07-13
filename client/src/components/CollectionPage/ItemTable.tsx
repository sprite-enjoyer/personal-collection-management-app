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
import { Item } from "../../misc/types";
import { useEffect, useState } from "react";
import ItemConfigStore from "../../stores/ItemConfigStore";
import ItemConfigModal from "./ItemConfigModal";
import CollectionPageStore from "../../stores/CollectionPageStore";
import { useNavigate } from "react-router-dom";

interface ItemTableProps {
  collectionPageStore: CollectionPageStore;
}

const ItemTable = ({ collectionPageStore }: ItemTableProps) => {
  const navigate = useNavigate();
  const [itemTableStore] = useState(new ItemTableStore(collectionPageStore.collection ?? []));
  const [itemConfigStore] = useState(new ItemConfigStore(collectionPageStore.collection._id));

  const deleteButtonHandler = async (id: string) => {
    await itemTableStore.deleteItem(id);
  };

  useEffect(() => {
    itemTableStore.setCollection(collectionPageStore.collection);
  }, [collectionPageStore.collection]);

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
                sx={{ maxHeight: "100px", overflowY: "auto", lineHeight: "100px", cursor: "pointer" }}>
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
                {ItemTableStore.getCollectionTableRowInformationArray(item)
                  .filter((info) => info.type !== "multiline")
                  .map((info, j) => (
                    <TableCell
                      onClick={() => navigate(`/item/${item._id}`)}
                      sx={{ maxWidth: "300px", overflow: "auto" }}
                      key={i.toString() + j.toString()}>
                      <Typography maxHeight={"200px"}>
                        {info.value !== null ? info.value.toString() : "null"}
                      </Typography>
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
        collectionPageStore={collectionPageStore}
      />
    </>
  );
};

export default observer(ItemTable);
