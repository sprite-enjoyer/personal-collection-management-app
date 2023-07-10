import { action, computed, makeObservable, observable } from "mobx";
import { Collection, Item } from "../misc/types";
import CollectionPageStore from "./CollectionPageStore";

class ItemTableStore {
  collection: Collection;

  itemConfigModalShown = false;

  constructor(collection: Collection) {
    this.collection = collection;

    makeObservable(this, {
      collection: observable,
      itemConfigModalShown: observable,
      setCollection: action,
      deleteItem: action,
      setItemConfigModalShown: action,
      collectionTableColumns: computed,
    });
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  setItemConfigModalShown(newValue: boolean) {
    this.itemConfigModalShown = newValue;
  }

  get collectionTableColumns() {
    if (!this.collection || this.collection.items.length === 0) return [];
    const fixedFieldNames = ["id", "name"];
    const additionalFieldNames = this.collection.additionalFieldsInfo.map((info) => info.name);
    return [...fixedFieldNames, ...additionalFieldNames];
  }

  static getCollectionTableRowInformationArray(item: Item) {
    const fixedFieldValues = [item._id, item.name];
    const additionalFieldValues = item.additionalFields.map((field) => field.value);
    return [...fixedFieldValues, ...additionalFieldValues];
  }

  async deleteItem(id: string) {
    const deletePromise = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/delete/${id}`, { method: "DELETE" });
    const { success } = (await deletePromise.json()) as { success: boolean };
    const collection = await CollectionPageStore.fetchCollection(this.collection._id);

    if (success) {
      console.log("item deleted sucessfully");
      this.setCollection(collection);
    }
  }
}

export default ItemTableStore;
