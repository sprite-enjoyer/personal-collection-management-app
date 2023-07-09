import { action, makeObservable, observable } from "mobx";
import { topics } from "../misc/constants";
import { Collection, AdditionalFieldInfo, AdditionalFieldTypeString } from "../misc/types";

class CollectionConfigStore {
  collectionName = "";

  collectionDescription = "";

  collectionTopic = "Other";

  additionalFieldToBeAdded: AdditionalFieldInfo = { name: "", type: "string" };

  additionalFieldsInfo: AdditionalFieldInfo[] = [];

  modalOpen = false;

  creatingCollection: boolean;

  collectionID?: string;

  userName?: string;

  constructor(creatingCollection: boolean, userName?: string, collectionID?: string) {
    this.creatingCollection = creatingCollection;
    this.collectionID = collectionID;
    this.userName = userName;

    makeObservable(this, {
      collectionName: observable,
      modalOpen: observable,
      additionalFieldsInfo: observable,
      additionalFieldToBeAdded: observable,
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
      setAdditionalFieldsInfo: action,
    });

    const fillValues = async () => {
      if (!this.creatingCollection) await this.populateFieldsWithExistingCollectionData();
    };

    fillValues();
  }

  setAdditionalFieldsInfo(newValue: AdditionalFieldInfo[]) {
    this.additionalFieldsInfo = newValue;
  }

  resetUserInputs() {
    this.collectionName = "";
    this.collectionDescription = "";
    this.collectionTopic = "Other";
    this.additionalFieldsInfo = [];
    this.additionalFieldToBeAdded = { name: "", type: "string" };
    this.modalOpen = false;
  }

  handleModalClose() {
    this.setModalOpen(false);
  }

  setModalOpen(newValue: boolean) {
    this.modalOpen = newValue;
  }

  setCustomFieldToBeAddedName(newValue: string) {
    this.additionalFieldToBeAdded.name = newValue;
  }

  setCustomFieldToBeAddedType(newValue: AdditionalFieldTypeString) {
    this.additionalFieldToBeAdded.type = newValue;
  }

  addCustomField() {
    const { name, type } = this.additionalFieldToBeAdded;
    this.additionalFieldsInfo.push({ name: name, type: type });
    this.additionalFieldToBeAdded = { name: "", type: "string" };
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
        additionalFieldsInfo: this.additionalFieldsInfo,
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
        additionalFieldsInfo: this.additionalFieldsInfo,
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
}

export default CollectionConfigStore;
