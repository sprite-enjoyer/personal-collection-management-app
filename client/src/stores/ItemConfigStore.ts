import { action, makeObservable, observable } from "mobx";
import { CustomFieldInfo, CustomFieldType, FullCustomField } from "../misc/types";

class ItemConfigStore {
  itemFields: FullCustomField[] = [];
  constructor(itemFields: CustomFieldInfo[] | null) {
    this.itemFields = ItemConfigStore.populateFieldsWithDefaultValues(itemFields);
    makeObservable(this, {
      itemFields: observable,
      setItemFields: action,
      setFieldValue: action,
    });
  }

  setItemFields(newValue: FullCustomField[]) {
    this.itemFields = newValue;
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
}

export default ItemConfigStore;
