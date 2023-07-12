export interface User {
  id: string;
  username: string;
  email: string;
  blocked: boolean;
  isAdmin: boolean;
  collections: Collection[];
}

export type AdditionalFieldTypeString = "string" | "multiline" | "boolean" | "integer" | "date";
export type AdditionalFieldType = string | number | boolean | Date | null;
export interface GenericAdditionalField<T> {
  _id: string;
  name: string;
  value: T;
  type: AdditionalFieldTypeString;
}

export type AdditionalField = GenericAdditionalField<AdditionalFieldType>;

export interface AdditionalFieldInfo {
  _id: string;
  name: string;
  type: AdditionalFieldTypeString;
}

export interface Item {
  _id: string;
  name: string;
  owner: string;
  containerCollection: string;
  tags: string[];
  additionalFields: AdditionalField[];
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  topic: string;
  image?: string;
  additionalFieldsInfo: AdditionalFieldInfo[];
  owner: string;
  items: Item[];
}
