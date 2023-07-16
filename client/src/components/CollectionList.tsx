import CollectionCard from "./CollectionCard";
import { Collection } from "../misc/types";

export interface CollectionListProps {
  collections: Collection[];
  showImage: boolean;
}

const CollectionList = ({ collections, showImage }: CollectionListProps) => {
  return (
    <>
      {collections.map((collection, i) => (
        <CollectionCard
          showImage={showImage}
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
