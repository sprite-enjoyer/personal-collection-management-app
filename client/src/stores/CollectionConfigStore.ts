import { action, makeObservable, observable } from "mobx";
import { englishTopics } from "../misc/constants";
import { Collection, AdditionalFieldInfo, AdditionalFieldTypeString } from "../misc/types";
import { NavigateFunction } from "react-router-dom";

class CollectionConfigStore {
  collection: Collection = {
    _id: "",
    name: "",
    description: "",
    topic: "Other",
    image: "",
    additionalFieldsInfo: [],
    owner: "",
    items: [],
  };

  additionalFieldToBeAddedName = "";

  additionalFieldToBeAddedType: AdditionalFieldTypeString = "string";

  creatingCollection: boolean;

  deleteCollectionDialogOpen = false;

  userName?: string;

  idCounter = "0";

  constructor(creatingCollection: boolean, userName?: string, collectionID?: string) {
    this.creatingCollection = creatingCollection;
    this.collection._id = collectionID ?? "";
    this.userName = userName;

    makeObservable(this, {
      collection: observable,
      idCounter: observable,
      additionalFieldToBeAddedName: observable,
      additionalFieldToBeAddedType: observable,
      deleteCollectionDialogOpen: observable,
      setCollectionDescription: action,
      setCollectionName: action,
      setCollectionTopic: action,
      addCustomField: action,
      setCustomFieldToBeAddedName: action,
      setCustomFieldToBeAddedType: action,
      resetUserInputs: action,
      setDeleteCollectionDialogOpen: action,
      setAdditionalFieldsInfo: action,
      deleteCollection: action,
      removeAdditionalFieldById: action,
      incrementIdCounter: action,
    });
  }

  incrementIdCounter() {
    const id = parseInt(this.idCounter);
    if (isNaN(id)) throw new Error("incrementIdCount error: can't cast id into a number");

    this.idCounter = (id + 1).toString();
  }

  removeAdditionalFieldById(_id: string) {
    this.setAdditionalFieldsInfo(this.collection.additionalFieldsInfo.filter((info) => info._id !== _id));
  }

  setDeleteCollectionDialogOpen(newValue: boolean) {
    this.deleteCollectionDialogOpen = newValue;
  }

  setAdditionalFieldsInfo(newValue: AdditionalFieldInfo[]) {
    this.collection.additionalFieldsInfo = newValue;
  }

  resetUserInputs() {
    this.collection = {
      _id: "",
      name: "",
      description: "",
      topic: "Other",
      image: "",
      additionalFieldsInfo: [],
      owner: "",
      items: [],
    };
    this.additionalFieldToBeAddedName = "";
    this.additionalFieldToBeAddedType = "string";
  }

  setCustomFieldToBeAddedName(newValue: string) {
    this.additionalFieldToBeAddedName = newValue;
  }

  setCustomFieldToBeAddedType(newValue: AdditionalFieldTypeString) {
    this.additionalFieldToBeAddedType = newValue;
  }

  addCustomField() {
    this.collection.additionalFieldsInfo.push({
      name: this.additionalFieldToBeAddedName,
      type: this.additionalFieldToBeAddedType,
      _id: this.idCounter,
    });
    this.additionalFieldToBeAddedName = "";
    this.additionalFieldToBeAddedType = "string";
    this.incrementIdCounter();
  }

  setCollectionName(newValue: string) {
    this.collection.name = newValue;
  }

  setCollectionDescription(newValue: string) {
    this.collection.description = newValue;
  }

  setCollectionTopic(newValue: string) {
    if (!englishTopics.includes(newValue)) throw new Error("Not in the list of predefined topics!");
    else this.collection.topic = newValue;
  }

  async createCollection() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        name: this.collection.name,
        description: this.collection.description,
        topic: this.collection.topic,
        image: "", //TODO
        additionalFieldsInfo: this.collection.additionalFieldsInfo.map((field) => {
          return { name: field.name, type: field.type };
        }),
      }),
    });

    const data = await response.json();
  }

  async editCollection() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.collection._id,
        name: this.collection.name,
        description: this.collection.description,
        topic: this.collection.topic,
        image: "", //TODO
        additionalFieldsInfo: this.collection.additionalFieldsInfo.map((field) => {
          return { name: field.name, type: field.type };
        }),
      }),
    });

    const data = await response.json();
  }

  async fetchCollection(collectionID: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/getCollection/${collectionID}`);
    const { data } = (await response.json()) as { data: Collection };
    return data;
  }

  async populateFieldsWithExistingCollectionData() {
    if (this.collection._id.length === 0) return;
    const collection = await this.fetchCollection(this.collection._id);

    this.setCollectionName(collection.name);
    this.setCollectionDescription(collection.description);
    this.setCollectionTopic(collection.topic);
    this.setAdditionalFieldsInfo(collection.additionalFieldsInfo);
  }

  async deleteCollection(navigate: NavigateFunction, globalUserName?: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/delete/${this.collection._id}`, {
      method: "DELETE",
    })
      .then(async (res) => await res.json())
      .then(() => navigate(`/user/${globalUserName}`));
  }
}

export default CollectionConfigStore;
