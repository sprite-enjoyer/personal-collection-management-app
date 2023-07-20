import { Collection, Item } from "../misc/types";
import { useContext, useEffect, useState } from "react";
import ItemConfigStore from "../stores/ItemConfigStore";
import { useLoaderData } from "react-router-dom";
import { observer } from "mobx-react";
import ItemFullInformation from "../components/ItemPage/ItemFullInformation";
import CommentSection from "../components/ItemPage/CommentSection";
import { Box } from "@mui/material";
import { GlobalUserInfoStoreContext } from "../App";
import CollectionPageStore from "../stores/CollectionPageStore";
import { useScreenSizeContext } from "../misc/screenSize";

interface ItemPageProps {}

const ItemPage = () => {
  const { item, userName, collection } = useLoaderData() as {
    item: Item;
    userName: string;
    collection: Collection;
  };
  const [itemConfigStore] = useState(new ItemConfigStore(item.containerCollection));
  const globalUserInfoStore = useContext(GlobalUserInfoStoreContext);
  const { userHasSmallScreen } = useScreenSizeContext();
  const [currentItem, setCurrentItem] = useState(item);

  useEffect(() => {
    const setViewingUser = async () => {
      globalUserInfoStore.setCurrentlyViewingUser((await CollectionPageStore.fetchUserName(item.owner)) ?? "");
    };
    setViewingUser();
  }, []);

  if (!item || !userName || !collection) return null;

  return (
    <Box
      sx={
        userHasSmallScreen
          ? {
              display: "flex",
              flexDirection: "column",
            }
          : { display: "flex", justifyContent: "space-between", overflow: "auto" }
      }>
      <ItemFullInformation
        collectionName={itemConfigStore.collection.name}
        ownerUserName={userName}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      <CommentSection itemID={item._id} />
    </Box>
  );
};

export default observer(ItemPage);
