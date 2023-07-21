export interface User {
  _id: string;
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
  usersWhoLikeItem: string[];
}

export interface ItemCardItem {
  _id: string;
  name: string;
  owner: User;
  containerCollection: Collection;
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

export interface Comment {
  _id: string;
  item: string;
  author: string;
  text: string;
}
export interface CloudinaryResponse {
  data: {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    access_mode: string;
    original_filename: string;
    original_extension: string;
  };
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
  config: {
    [key: string]: any;
  };
  request: {
    [key: string]: any;
  };
}
