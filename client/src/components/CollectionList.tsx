import CollectionCard from "./CollectionCard";
import { Collection } from "../misc/types";

export interface CollectionListProps {
  collections: Collection[];
}

const CollectionList = ({ collections }: CollectionListProps) => {
  return (
    <>
      {collections.map((collection, i) => (
        <CollectionCard
          topic={collection.topic}
          key={i}
          name={collection.name}
          image={collection.image}
          description={collection.description}
          id={collection._id}
        />
      ))}
    </>
  );
};

export default CollectionList;
