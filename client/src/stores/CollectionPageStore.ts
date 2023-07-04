import { action, computed, makeObservable, observable } from "mobx";
import { Collection, Item } from "../misc/types";

class CollectionPageStore {
  collection?: Collection;
  constructor(collectionID: string) {
    makeObservable(this, {
      collection: observable,
      setCollection: action,
      fetchCollection: action,
      collectionTableColumns: computed,
      collectionTableRows: computed,
    });
    this.fetchCollection(collectionID);
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  async fetchCollection(collectionID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getCollection/${collectionID}`, {
      method: "GET",
    });
    const { data } = (await response.json()) as { success: boolean; data: Collection };
    console.log(data);
    this.setCollection(data);
  }

  get collectionTableColumns() {
    if (!this.collection || this.collection.items.length === 0) return [];
    const fixedFieldNames = ["id", "name", "tags"];
    const additionalFields = this.collection.items[0].additionalFields;

    const additionalFieldNames = [
      ...(additionalFields.booleanFieldNames ?? []),
      ...(additionalFields.stringFieldNames ?? []),
      ...(additionalFields.multilineTextFieldNames ?? []),
      ...(additionalFields.integerFieldNames ?? []),
      ...(additionalFields.dateFieldNames ?? []),
    ];
    return [...fixedFieldNames, ...additionalFieldNames];
  }

  get collectionTableRows() {
    return this.collection?.items ?? [];
  }

  static getCollectionTableRowInformationArray(item: Item) {
    const fixedFieldValues = [item._id, item.name, item.tags];
    const additionalFields = item.additionalFields;

    const additionalFieldValues = [
      ...(additionalFields.booleanFieldValues ?? []),
      ...(additionalFields.stringFieldValues ?? []),
      ...(additionalFields.multilineTextFieldValues ?? []),
      ...(additionalFields.integerFieldValues ?? []),
      ...(additionalFields.dateFieldValues ?? []),
    ];

    return [...fixedFieldValues, ...additionalFieldValues];
  }
}

export default CollectionPageStore;
