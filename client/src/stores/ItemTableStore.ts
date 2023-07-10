import { action, computed, makeObservable, observable } from "mobx";
import { Collection, Item } from "../misc/types";

class ItemTableStore {
  collection: Collection;
  constructor(collection: Collection) {
    this.collection = collection;
    makeObservable(this, {
      collection: observable,
      setCollection: action,
      deleteItem: action,
      collectionTableColumns: computed,
    });
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
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
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/delete/${id}`);
  }
  async editItem(id: string) {}
}

export default ItemTableStore;
