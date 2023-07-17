import { action, computed, makeObservable, observable, toJS } from "mobx";
import { Collection, User } from "../misc/types";

class CollectionPageStore {
  collection: Collection;

  itemConfigModalOpen = false;

  collectionConfigModalOpen = false;

  userName: string;

  constructor(collection: Collection, userName: string) {
    this.collection = collection;
    this.userName = userName;

    makeObservable(this, {
      collection: observable,
      itemConfigModalOpen: observable,
      collectionConfigModalOpen: observable,
      setCollection: action,
      userName: observable,
      setItemConfigModalOpen: action,
      setUserName: action,
      setCollectionConfigModalOpen: action,
      shouldRenderTable: computed,
      tags: computed,
    });
  }

  setUserName(newValue: string) {
    this.userName = newValue;
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  setCollectionConfigModalOpen(newValue: boolean) {
    this.collectionConfigModalOpen = newValue;
  }

  setItemConfigModalOpen(newValue: boolean) {
    this.itemConfigModalOpen = newValue;
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
}

export default CollectionPageStore;
