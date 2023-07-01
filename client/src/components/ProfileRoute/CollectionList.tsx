import { observer } from "mobx-react";
import ProfilePageStore from "../../stores/ProfilePageStore";

export interface CollectionListProps {
  profilePageStore: ProfilePageStore;
}

const CollectionList = ({ profilePageStore }: CollectionListProps) => {
  return profilePageStore.collections.map((col, i) => <div key={i}>{col.name}</div>);
};

export default observer(CollectionList);
