import { action, makeObservable, observable } from "mobx";
import { topics } from "../misc/constants";
import { CustomField, CustomFieldType } from "../misc/types";

class CollectionConfigStore {
  collectionName = "";

  collectionDescription = "";

  collectionTopic = "Other";

  customFields: CustomField[] = [];

  customFieldToBeAdded: CustomField = { id: 0, name: "", type: "string" };

  modalOpen = false;

  constructor() {
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

  createCollection() {}

  editCollection() {}
}

export default CollectionConfigStore;
