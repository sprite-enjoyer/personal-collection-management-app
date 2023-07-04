import { action, makeObservable, observable } from "mobx";
import { topics } from "../misc/constants";
import { Collection, CustomField, CustomFieldType } from "../misc/types";

class CollectionConfigStore {
  collectionName = "";

  collectionDescription = "";

  collectionTopic = "Other";

  customFields: CustomField[] = [];

  customFieldToBeAdded: CustomField = { id: 0, name: "", type: "string" };

  modalOpen = false;

  collectionID?: string;

  userName?: string;

  constructor(userName?: string, collectionID?: string) {
    this.collectionID = collectionID;
    this.userName = userName;

    makeObservable(this, {
      collectionName: observable,
      modalOpen: observable,
      customFields: observable,
      customFieldToBeAdded: observable,
      collectionDescription: observable,
      collectionTopic: observable,
      setCollectionDescription: action,
      setCollectionName: action,
      setCollectionTopic: action,
      setCustomFields: action,
      addCustomField: action,
      setModalOpen: action,
      handleModalClose: action,
      setCustomFieldToBeAddedName: action,
      setCustomFieldToBeAddedType: action,
      resetUserInputs: action,
    });
  }

  resetUserInputs() {
    this.collectionName = "";
    this.collectionDescription = "";
    this.collectionTopic = "Other";
    this.customFields = [];
    this.customFieldToBeAdded = { id: 0, name: "", type: "string" };
    this.modalOpen = false;
  }

  handleModalClose() {
    this.setModalOpen(false);
  }

  setModalOpen(newValue: boolean) {
    this.modalOpen = newValue;
    if (this.modalOpen === true) this.populateFieldsWithExistingCollectionData();
  }

  setCustomFieldToBeAddedName(newValue: string) {
    this.customFieldToBeAdded.name = newValue;
  }

  setCustomFieldToBeAddedType(newValue: CustomFieldType) {
    this.customFieldToBeAdded.type = newValue;
  }

  addCustomField() {
    this.customFields.push({
      id: this.customFieldToBeAdded.id,
      name: this.customFieldToBeAdded.name,
      type: this.customFieldToBeAdded.type,
    });
    this.customFieldToBeAdded = { id: this.customFields.length, name: "", type: "string" };
  }

  setCustomFields(newValue: CustomField[]) {
    this.customFields = newValue;
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
        additionalCollectionFieldNames: this.customFields.map((field) => field.name),
        additionalCollectionFieldTypes: this.customFields.map((field) => field.type),
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
        userName: this.userName,
        name: this.collectionName,
        description: this.collectionDescription,
        topic: this.collectionTopic,
        image: "", //TODO
        additionalCollectionFieldNames: this.customFields.map((field) => field.name),
        additionalCollectionFieldTypes: this.customFields.map((field) => field.type),
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
    const customFields = collection.additionalCollectionFieldNames.map((name, i) => {
      const result: CustomField = {
        id: i,
        name: name,
        type: collection.additionalCollectionFieldTypes[i],
      };
      return result;
    });

    this.setCollectionName(collection.name);
    this.setCollectionDescription(collection.description);
    this.setCollectionTopic(collection.topic);
    this.setCustomFields(customFields);
  }
}

export default CollectionConfigStore;
