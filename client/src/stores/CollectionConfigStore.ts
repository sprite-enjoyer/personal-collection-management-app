import { action, makeObservable, observable } from "mobx";
import { topics } from "../misc/constants";
import { Collection, AdditionalFieldInfo, AdditionalFieldTypeString } from "../misc/types";
import { NavigateFunction } from "react-router-dom";

class CollectionConfigStore {
  collectionName = "";

  collectionDescription = "";

  collectionTopic = "Other";

  additionalFieldToBeAddedName = "";

  additionalFieldToBeAddedType: AdditionalFieldTypeString = "string";

  additionalFieldsInfo: AdditionalFieldInfo[] = [];

  modalOpen = false;

  creatingCollection: boolean;

  deleteCollectionDialogOpen = false;

  collectionID?: string;

  userName?: string;

  constructor(creatingCollection: boolean, userName?: string, collectionID?: string) {
    this.creatingCollection = creatingCollection;
    this.collectionID = collectionID;
    this.userName = userName;

    makeObservable(this, {
      collectionName: observable,
      modalOpen: observable,
      additionalFieldToBeAddedName: observable,
      additionalFieldToBeAddedType: observable,
      deleteCollectionDialogOpen: observable,
      additionalFieldsInfo: observable,
      collectionDescription: observable,
      collectionTopic: observable,
      setCollectionDescription: action,
      setCollectionName: action,
      setCollectionTopic: action,
      addCustomField: action,
      setModalOpen: action,
      handleModalClose: action,
      setCustomFieldToBeAddedName: action,
      setCustomFieldToBeAddedType: action,
      resetUserInputs: action,
      setDeleteCollectionDialogOpen: action,
      setAdditionalFieldsInfo: action,
      deleteCollection: action,
    });
  }

  setDeleteCollectionDialogOpen(newValue: boolean) {
    this.deleteCollectionDialogOpen = newValue;
  }

  setAdditionalFieldsInfo(newValue: AdditionalFieldInfo[]) {
    this.additionalFieldsInfo = newValue;
  }

  resetUserInputs() {
    this.collectionName = "";
    this.collectionDescription = "";
    this.collectionTopic = "Other";
    this.additionalFieldsInfo = [];
    this.additionalFieldToBeAddedName = "";
    this.additionalFieldToBeAddedType = "string";
    this.modalOpen = false;
  }

  handleModalClose() {
    this.setModalOpen(false);
  }

  setModalOpen(newValue: boolean) {
    this.modalOpen = newValue;
  }

  setCustomFieldToBeAddedName(newValue: string) {
    this.additionalFieldToBeAddedName = newValue;
  }

  setCustomFieldToBeAddedType(newValue: AdditionalFieldTypeString) {
    this.additionalFieldToBeAddedType = newValue;
  }

  addCustomField() {
    this.additionalFieldsInfo.push({
      name: this.additionalFieldToBeAddedName,
      type: this.additionalFieldToBeAddedType,
      _id: "",
    });
    this.additionalFieldToBeAddedName = "";
    this.additionalFieldToBeAddedType = "string";
  }

  setCollectionName(newValue: string) {
    this.collectionName = newValue;
  }

  setCollectionDescription(newValue: string) {
    this.collectionDescription = newValue;
  }

  setCollectionTopic(newValue: string) {
    if (!topics.includes(newValue)) throw new Error("Not in the list of predefined topics!");
    else this.collectionTopic = newValue;
  }

  async createCollection() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        name: this.collectionName,
        description: this.collectionDescription,
        topic: this.collectionTopic,
        image: "", //TODO
        additionalFieldsInfo: this.additionalFieldsInfo.map((field) => {
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
        id: this.collectionID,
        name: this.collectionName,
        description: this.collectionDescription,
        topic: this.collectionTopic,
        image: "", //TODO
        additionalFieldsInfo: this.additionalFieldsInfo.map((field) => {
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
    if (!this.collectionID) return;
    const collection = await this.fetchCollection(this.collectionID);

    this.setCollectionName(collection.name);
    this.setCollectionDescription(collection.description);
    this.setCollectionTopic(collection.topic);
    this.setAdditionalFieldsInfo(collection.additionalFieldsInfo);
  }

  async deleteCollection(navigate: NavigateFunction, globalUserName?: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/collections/delete/${this.collectionID}`, {
      method: "DELETE",
    })
      .then(async (res) => await res.json())
      .then(() => navigate(`/user/${globalUserName}`));
    this.setModalOpen(false);
  }
}

export default CollectionConfigStore;
