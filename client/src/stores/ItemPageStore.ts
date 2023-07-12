import { makeObservable } from "mobx";
import { Item } from "../misc/types";

class ItemPageStore {
  constructor() {
    makeObservable(this, {});
  }

  static async fetchItem(itemID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/get/${itemID}`);
    const json = (await response.json()) as { success: boolean; data: Item };
    return json.data;
  }
}

export default ItemPageStore;
