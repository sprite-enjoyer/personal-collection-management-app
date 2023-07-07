import { action, makeObservable, observable } from "mobx";
import {
  AdditionalFields,
  CustomFieldInfo,
  CustomFieldType,
  CustomFieldTypeProperty,
  FullCustomField,
  Item,
} from "../misc/types";

class ItemConfigStore {
  name = "";

  itemFields: FullCustomField[] = [];

  constructor(itemFields: CustomFieldInfo[] | null) {
    this.itemFields = ItemConfigStore.populateFieldsWithDefaultValues(itemFields);
    makeObservable(this, {
      itemFields: observable,
      name: observable,
      setItemFields: action,
      setFieldValue: action,
      setName: action,
    });
  }

  setName(newValue: string) {
    this.name = newValue;
  }

  setItemFields(newValue: CustomFieldInfo[] | FullCustomField[] | null, infoOnly: boolean) {
    if (infoOnly) {
      const processedNewValue = ItemConfigStore.populateFieldsWithDefaultValues(newValue);
      this.itemFields = processedNewValue;
    } else {
      const fields = newValue as FullCustomField[];
      this.itemFields = fields;
    }
  }

  static populateFieldsWithDefaultValues(itemFields: CustomFieldInfo[] | null) {
    const itemFieldsWithValues =
      itemFields?.map((field) => {
        let value;
        switch (field.type) {
          case "boolean":
            value = false;
            break;
          case "date":
            value = new Date();
            break;
          case "integer":
            value = 0;
            break;
          case "string":
          case "multiline":
            value = "";
            break;
        }
        return { value, ...field };
      }) ?? [];

    return itemFieldsWithValues;
  }

  setFieldValue(id: number, newValue: CustomFieldType) {
    const itemToChange = this.itemFields.find((item) => item.id === id);
    if (itemToChange) itemToChange.value = newValue;
  }

  filterFields<T>(type: CustomFieldTypeProperty, name: boolean) {
    const result = this.itemFields
      .filter((item) => item.type === type)
      .map((item) => (name ? item.name : item.value)) as T;
    return result;
  }

  async createItem(collectionID?: string, ownerUserName?: string) {
    if (!collectionID || !ownerUserName) throw new Error("collection ID or owner not found");
    const additionalFields: AdditionalFields = {
      stringFieldNames: this.filterFields<string[]>("string", true),
      stringFieldValues: this.filterFields<string[]>("string", false),
      booleanFieldNames: this.filterFields<string[]>("boolean", true),
      booleanFieldValues: this.filterFields<boolean[]>("boolean", false),
      multilineTextFieldNames: this.filterFields<string[]>("multiline", true),
      multilineTextFieldValues: this.filterFields<string[]>("multiline", false),
      dateFieldNames: this.filterFields<string[]>("date", true),
      dateFieldValues: this.filterFields<Date[]>("date", false),
      integerFieldNames: this.filterFields<string[]>("integer", true),
      integerFieldValues: this.filterFields<number[]>("integer", false),
    };

    const newItem: Omit<Item, "_id"> = {
      name: this.name,
      owner: ownerUserName,
      additionalFields: additionalFields,
    };

    const body = { ...newItem, containerCollection: collectionID };

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
}

export default ItemConfigStore;
