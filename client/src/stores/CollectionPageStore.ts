import { action, computed, makeObservable, observable, toJS } from "mobx";
import { Collection, Item, User } from "../misc/types";

class CollectionPageStore {
  collection: Collection;

  userName: string;

  constructor(collection: Collection, userName: string) {
    this.collection = collection;
    this.userName = userName;

    makeObservable(this, {
      collection: observable,
      setCollection: action,
      userName: observable,
      setUserName: action,
      shouldRenderTable: computed,
      tags: computed,
      csvData: computed,
    });
  }

  setUserName(newValue: string) {
    this.userName = newValue;
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
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

  get shouldRenderTable() {
    return this.collection && this.collection?.items.length !== 0;
  }

  get tags() {
    return [...new Set(this.collection.items.map((item) => item.tags).flat())];
  }

  get csvData() {
    const csvCollectionItems: Item[] = JSON.parse(JSON.stringify(this.collection.items));
    const csvCollectionItemAdditionalFields = csvCollectionItems.map((item) =>
      item.additionalFields.map((field) => field.value)
    );

    csvCollectionItems.forEach((item, i) => {
      item.additionalFields.forEach((_, j) => {
        csvCollectionItems[i].additionalFields[j] = csvCollectionItemAdditionalFields[i][j] as unknown as any;
      });
    });

    return csvCollectionItems;
  }
}

export default CollectionPageStore;
