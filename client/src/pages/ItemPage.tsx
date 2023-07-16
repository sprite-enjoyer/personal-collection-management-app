import { Collection, Item } from "../misc/types";
import { useState } from "react";
import ItemConfigStore from "../stores/ItemConfigStore";
import { useLoaderData } from "react-router-dom";
import { routeBaseStyles } from "../misc/styleUtils";
import { observer } from "mobx-react";
import ItemFullInformation from "../components/ItemPage/ItemFullInformation";
import CommentSection from "../components/ItemPage/CommentSection";

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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ItemFullInformation
        item={item}
        collectionName={itemConfigStore.collection.name}
        ownerUserName={userName}
      />
      <CommentSection itemID={item._id} />
    </div>
  );
};

export default observer(ItemPage);
