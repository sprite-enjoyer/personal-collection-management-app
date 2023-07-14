import { Item, ItemCardItem } from "../../misc/types";
import ItemCard from "./ItemCard";

interface LatestItemsListProps {
  items: ItemCardItem[];
}

const LatestItemsList = ({ items }: LatestItemsListProps) => {
  return (
    <>
      {items.map((item) => (
        <ItemCard
          item={item}
          key={item._id}
        />
      ))}
    </>
  );
};

export default LatestItemsList;
