import { action, makeObservable, observable } from "mobx";
import { Collection } from "../misc/types";

class ProfilePageStore {
  collections: Collection[] = [];

  userName: string;

  collectionConfigModalOpen = false;

  constructor(userName: string) {
    makeObservable(this, {
      collections: observable,
      collectionConfigModalOpen: observable,
      fetchCollections: action,
      setCollections: action,
      setCollectionConfigModalOpen: action,
    });

    this.userName = userName;
    this.fetchCollections();
  }

  setCollectionConfigModalOpen(newValue: boolean) {
    this.collectionConfigModalOpen = newValue;
  }

  setCollections(newValue: Collection[]) {
    this.collections = newValue;
  }

  async fetchCollections() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getUserCollections/${this.userName}`, {
      method: "GET",
    });

    const responseBody = (await response.json()) as { success: boolean; data: null | Collection[] };
    const { data } = responseBody;
    this.setCollections(data ?? []);
  }
}

export default ProfilePageStore;
