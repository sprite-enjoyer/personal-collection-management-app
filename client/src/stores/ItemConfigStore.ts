import { action, makeObservable, observable, toJS } from "mobx";
import {
  Collection,
  AdditionalField,
  AdditionalFieldType,
  AdditionalFieldInfo,
  AdditionalFieldTypeString,
  Item,
} from "../misc/types";
import axios from "axios";

class ItemConfigStore {
  name = "";

  additionalFields: AdditionalField[] = [];

  chosenTags: string[] = [];

  collection: Collection = {
    _id: "",
    name: "",
    description: "",
    topic: "",
    image: "",
    additionalFieldsInfo: [],
    owner: "",
    items: [],
  };

  editingItemID: string | null = null;

  constructor(collecitonID: string) {
    makeObservable(this, {
      additionalFields: observable,
      name: observable,
      chosenTags: observable,
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
      setChosenTags: action,
      createItem: action,
      fetchCollection: action,
      addChosenTag: action,
      fetchItem: action,
    });

    const getCollection = async () => await this.updateCollectionFromDB(collecitonID);

    getCollection();
  }

  addChosenTag(newValue: string) {
    if (this.chosenTags.includes(newValue) || newValue.length === 0) return;
    this.chosenTags = [...this.chosenTags, newValue];
  }

  setChosenTags(newValue: string[]) {
    this.chosenTags = newValue;
  }

  setEditingItemID(newValue: string) {
    this.editingItemID = newValue;
  }

  resetUserInputs() {
    this.name = "";
    this.setAdditionalFields(
      this.additionalFields.map((field) => {
        return { ...field, value: ItemConfigStore.getFieldDefaultValue(field.type, new Date()) };
      })
    );
    this.chosenTags = [];
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
      tags: this.chosenTags,
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

  async updateCollectionFromDB(collectionID?: string) {
    const collection = await this.fetchCollection(collectionID ?? this.collection._id);
    this.setCollection(collection);
    this.setAdditionalFields(ItemConfigStore.fillAdditionalFieldsWithEmptyValues(collection.additionalFieldsInfo));
  }

  async editItem(itemID: string) {
    const body = {
      name: this.name,
      additionalFields: toJS(this.additionalFields),
      tags: this.chosenTags,
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/items/edit/${itemID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const { success } = await response.json();
  }

  async fetchItem() {
    if (!this.editingItemID) return;
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/get/${this.editingItemID}`);
    const { data } = (await response.data) as { data: Item };
    this.setAdditionalFields(data.additionalFields);
    this.setChosenTags(data.tags);
    this.setName(data.name);
  }
}

export default ItemConfigStore;
