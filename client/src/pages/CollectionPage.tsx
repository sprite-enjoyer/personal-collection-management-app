import { useState } from "react";
import { useParams } from "react-router-dom";
import CollectionPageStore from "../stores/CollectionPageStore";
import ItemTable from "../components/CollectionPage/ItemTable";
import { routeBaseStyles } from "../misc/styleUtils";
import { observer } from "mobx-react";

const CollectionPage = () => {
  const { collectionID } = useParams();
  if (!collectionID) return null;

  const [collectionPageStore] = useState(new CollectionPageStore(collectionID));

  return (
    <div style={routeBaseStyles}>
      <ItemTable collectionPageStore={collectionPageStore} />
    </div>
  );
};

export default observer(CollectionPage);
