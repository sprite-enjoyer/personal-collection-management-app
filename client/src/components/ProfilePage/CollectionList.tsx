import { observer } from "mobx-react";
import ProfilePageStore from "../../stores/ProfilePageStore";
import CollectionCard from "./CollectionCard";
import { ReactElement } from "react";

export interface CollectionListProps {
  profilePageStore: ProfilePageStore;
}

const CollectionList = ({ profilePageStore }: CollectionListProps) => {
  return (
    <>
      {profilePageStore.collections.map((col, i) => (
        <CollectionCard
          key={i}
          name={col.name}
          image={col.image}
          description={col.description}
          id={col._id}
        />
      ))}
    </>
  );
};

export default observer(CollectionList);
