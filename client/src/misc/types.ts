export interface User {
  id: string;
  userName: string;
  email: string;
  blocked: boolean;
  isAdmin: boolean;
  collections: Array<any>; // TODO implement collections and change any to the collection type
}

export type CustomFieldTypeProperty = "string" | "integer" | "multiline" | "boolean" | "date";
export type CustomFieldType = string | number | boolean | Date;
export interface CustomFieldInfo {
  id: number;
  name: string;
  type: CustomFieldTypeProperty;
}

export interface FullCustomField extends CustomFieldInfo {
  value: string | number | boolean | Date;
}

export interface AdditionalFields {
  stringFieldNames: string[];
  stringFieldValues: string[];
  booleanFieldNames: string[];
  booleanFieldValues: boolean[];
  multilineTextFieldNames: string[];
  multilineTextFieldValues: string[];
  dateFieldNames: string[];
  dateFieldValues: Date[];
  integerFieldNames: string[];
  integerFieldValues: number[];
}
export interface Item {
  _id: string;
  name: string;
  tags: string[];
  owner: string;
  additionalFields: AdditionalFields;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  topic: string;
  image?: string;
  additionalCollectionFieldNames: string[];
  additionalCollectionFieldTypes: CustomFieldTypeProperty[];
  owner: string;
  items: Item[];
}
