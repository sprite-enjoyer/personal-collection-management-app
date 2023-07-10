import { action, makeObservable, observable, toJS } from "mobx";
import {
  Collection,
  AdditionalField,
  AdditionalFieldType,
  AdditionalFieldInfo,
  AdditionalFieldTypeString,
} from "../misc/types";

class ItemConfigStore {
  name = "";

  additionalFields: AdditionalField[] = [];

  collection: Collection;

  editingItemID: string | null = null;

  constructor(colleciton: Collection) {
    this.collection = colleciton;

    makeObservable(this, {
      additionalFields: observable,
      name: observable,
      editingItemID: observable,
      collection: observable,
      setAdditionalFields: action,
      setFieldValue: action,
      setName: action,
      setEditingItemID: action,
      updateCollectionFromDB: action,
      setCollection: action,
      resetUserInputs: action,
      editItem: action,
    });
    const update = async () => await this.updateCollectionFromDB();
    update();
  }

  setEditingItemID(newValue: string) {
    this.editingItemID = newValue;
  }

  resetUserInputs() {
    this.name = "";
    this.additionalFields = [];
  }

  setCollection(newValue: Collection) {
    this.collection = newValue;
  }

  setName(newValue: string) {
    this.name = newValue;
  }

  setAdditionalFields(newValue: AdditionalField[]) {
    this.additionalFields = newValue;
  }

  setFieldValue(name: string, newValue: AdditionalFieldType) {
    const itemToChange = this.additionalFields.find((field) => field.name === name);
    if (itemToChange) itemToChange.value = newValue;
  }

  async createItem(collectionID: string, ownerID: string) {
    const body = {
      ownerID: ownerID,
      collectionID: collectionID,
      itemName: this.name,
      additionalFields: this.additionalFields,
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();
    this.resetUserInputs();
  }

  static getFieldDefaultValue(type: AdditionalFieldTypeString, date: Date) {
    switch (type) {
      case "boolean":
        return false;
      case "date":
        return date;
      case "integer":
        return 0;
      case "multiline":
      case "string":
        return "";
    }
  }

  static fillAdditionalFieldsWithEmptyValues(customFieldsInfo: AdditionalFieldInfo[]) {
    const date = new Date();
    const additionalFieldsWithDefaultValues = customFieldsInfo.map((field) => {
      return { ...field, value: this.getFieldDefaultValue(field.type, date) };
    });

    return additionalFieldsWithDefaultValues;
  }

  async fetchCollection(collectionID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getCollection/${collectionID}`);
    const { data } = (await response.json()) as { data: Collection };
    return data;
  }

  async updateCollectionFromDB() {
    const collection = await this.fetchCollection(this.collection._id);
    this.setCollection(collection);
    this.setAdditionalFields(ItemConfigStore.fillAdditionalFieldsWithEmptyValues(collection.additionalFieldsInfo));
  }

  async editItem(itemID: string) {
    const body = {
      name: this.name,
      additionalFields: toJS(this.additionalFields),
    };

    console.log(body);

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/edit/${itemID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const { success } = await response.json();
    if (success) console.log("successfully edited an item");
  }
}

export default ItemConfigStore;
