import { action, makeObservable, observable } from "mobx";
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

  constructor(colleciton: Collection) {
    this.collection = colleciton;

    makeObservable(this, {
      additionalFields: observable,
      name: observable,
      collection: observable,
      setAdditionalFields: action,
      setFieldValue: action,
      setName: action,
      updateCollectionFromDB: action,
      setCollection: action,
    });
    const update = async () => await this.updateCollectionFromDB();
    update();
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
}

export default ItemConfigStore;
