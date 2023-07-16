import { action, computed, makeObservable, observable } from "mobx";
import { AdditionalFieldType, AdditionalFieldTypeString, Collection, Item } from "../misc/types";
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
    const fixedFieldNames = ["name"];
    const additionalFieldNames = this.collection.additionalFieldsInfo
      .filter((info) => info.type !== "multiline")
      .map((info) => info.name);
    console.log([...fixedFieldNames, ...additionalFieldNames], "SDIOLFGHJKLSDHFJKL");
    return [...fixedFieldNames, ...additionalFieldNames];
  }

  static getCollectionTableRowInformationArray(item: Item): {
    type: AdditionalFieldTypeString;
    value: AdditionalFieldType;
  }[] {
    const fixedFieldValues: {
      type: AdditionalFieldTypeString;
      value: AdditionalFieldType;
    }[] = [{ value: item.name, type: "string" }];
    const additionalFieldValues = item.additionalFields
      .map((field) => {
        const res: {
          type: AdditionalFieldTypeString;
          value: AdditionalFieldType;
        } = { value: field.value, type: field.type };
        return res;
      })
      .filter((e) => e.type !== "multiline");
    return [...fixedFieldValues, ...additionalFieldValues];
  }

  async deleteItem(id: string) {
    const deletePromise = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/delete/${id}`, { method: "DELETE" });
    const { success } = (await deletePromise.json()) as { success: boolean };
    const collection = await CollectionPageStore.fetchCollection(this.collection._id);

    if (success) this.setCollection(collection);
  }
}

export default ItemTableStore;
