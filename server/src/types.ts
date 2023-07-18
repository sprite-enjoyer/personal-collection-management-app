import { ItemType } from "./schemas/Item.js";

export type UserInfo = { userID: null | string; blocked: boolean; isAdmin: boolean; loggedIn: boolean };
export type ProcessedItem = ItemType & {
  _id: string;
  additionalFields: { name: string; value: string; type: string }[];
};
