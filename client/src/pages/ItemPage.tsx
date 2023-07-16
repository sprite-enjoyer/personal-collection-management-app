import { Collection, Item } from "../misc/types";
import { useState } from "react";
import ItemConfigStore from "../stores/ItemConfigStore";
import { useLoaderData } from "react-router-dom";
import { observer } from "mobx-react";
import ItemFullInformation from "../components/ItemPage/ItemFullInformation";
import CommentSection from "../components/ItemPage/CommentSection";
import { Box } from "@mui/material";

interface ItemPageProps {}

const ItemPage = () => {
  const { item, userName, collection } = useLoaderData() as {
    item: Item;
    userName: string;
    collection: Collection;
  };
  if (!item || !userName || !collection) return null;
  const [itemConfigStore] = useState(new ItemConfigStore(item.containerCollection));

  return (
    <Box style={{ display: "flex", justifyContent: "space-between", overflow: "auto" }}>
      <ItemFullInformation
        item={item}
        collectionName={itemConfigStore.collection.name}
        ownerUserName={userName}
      />
      <CommentSection itemID={item._id} />
    </Box>
  );
};

export default observer(ItemPage);
