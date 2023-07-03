export interface User {
  id: string;
  userName: string;
  email: string;
  blocked: boolean;
  isAdmin: boolean;
  collections: Array<any>; // TODO implement collections and change any to the collection type
}

export type CustomFieldType = "string" | "integer" | "multiline" | "boolean" | "date";
export interface CustomField {
  _id: number;
  name: string;
  type: CustomFieldType;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  topic: string;
  image?: string;
  additionalCollectionFieldNames: string[];
  additionalCollectionFieldTypes: string[];
  owner: string;
}
