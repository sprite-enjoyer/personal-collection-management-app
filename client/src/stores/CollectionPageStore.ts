import { action, computed, makeObservable, observable, toJS } from "mobx";
import { Collection, CustomField, Item } from "../misc/types";

class CollectionPageStore {
  collection?: Collection;
  addItemModalOpen = false;

  constructor(collectionID: string) {
    makeObservable(this, {
      collection: observable,
      addItemModalOpen: observable,
      setCollection: action,
      fetchCollection: action,
      setAddItemModalOpen: action,
      collectionTableColumns: computed,
      collectionTableRows: computed,
      shouldRenderTable: computed,
      itemFields: computed,
    });
    this.fetchCollection(collectionID);
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  setAddItemModalOpen(newValue: boolean) {
    this.addItemModalOpen = newValue;
  }

  async fetchCollection(collectionID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getCollection/${collectionID}`, {
      method: "GET",
    });
    const { data } = (await response.json()) as { success: boolean; data: Collection };
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

  get shouldRenderTable() {
    return this.collection && this.collection?.items.length !== 0;
  }

  get itemFields() {
    if (!this.collection) return null;
    const { additionalCollectionFieldNames, additionalCollectionFieldTypes } = this.collection;
    const customFields = additionalCollectionFieldNames.map((name, i) => {
      const result: CustomField = {
        id: i,
        name: name,
        type: additionalCollectionFieldTypes[i],
      };
      return result;
    });
    return customFields;
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
