import { action, computed, makeObservable, observable, toJS } from "mobx";
import { Collection, AdditionalField, Item, User } from "../misc/types";

class CollectionPageStore {
  collection: Collection;

  addItemModalOpen = false;

  userName: string;

  constructor(collection: Collection, userName: string) {
    this.collection = collection;
    this.userName = userName;

    makeObservable(this, {
      collection: observable,
      addItemModalOpen: observable,
      setCollection: action,
      userName: observable,
      setAddItemModalOpen: action,
      setUserName: action,
      collectionTableColumns: computed,
      shouldRenderTable: computed,
    });
  }

  setUserName(newValue: string) {
    this.userName = newValue;
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  setAddItemModalOpen(newValue: boolean) {
    this.addItemModalOpen = newValue;
  }

  static async fetchCollection(collectionID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getCollection/${collectionID}`, {
      method: "GET",
    });
    const { data } = (await response.json()) as { success: boolean; data: Collection };
    return data;
  }

  static async fetchUserName(owner: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/getUserById/${owner}`);
    const { success, data } = (await response.json()) as { success: boolean; data: User | null };
    return data?.username;
  }

  get collectionTableColumns() {
    if (!this.collection || this.collection.items.length === 0) return [];
    const fixedFieldNames = ["id", "name"];
    const additionalFieldNames = this.collection.customFieldsInfo.map((info) => info.name);
    return [...fixedFieldNames, ...additionalFieldNames];
  }

  get shouldRenderTable() {
    return this.collection && this.collection?.items.length !== 0;
  }

  static getCollectionTableRowInformationArray(item: Item) {
    const fixedFieldValues = [item._id, item.name];
    const additionalFieldValues = item.additionalFields.map((field) => field.value);
    return [...fixedFieldValues, ...additionalFieldValues];
  }
}

export default CollectionPageStore;
