import { action, makeObservable, observable } from "mobx";
import { Collection } from "../misc/types";

class ProfilePageStore {
  collections: Collection[] = [];

  userName: string;

  constructor(userName: string, collections: Collection[]) {
    this.collections = collections;
    makeObservable(this, {
      collections: observable,
      setCollections: action,
    });

    this.userName = userName;
  }

  setCollections(newValue: Collection[]) {
    this.collections = newValue;
  }

  static async fetchCollections(userName: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getUserCollections/${userName}`, {
      method: "GET",
    });

    const responseBody = (await response.json()) as { success: boolean; data: null | Collection[] };
    const { data } = responseBody;
    return data;
  }
}

export default ProfilePageStore;
