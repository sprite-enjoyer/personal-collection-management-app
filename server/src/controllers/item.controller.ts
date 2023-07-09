import { Request, Response } from "express";
import Item, { AdditionalFields } from "../schemas/Item.js";
import ItemCollection from "../schemas/ItemCollection.js";
import { Types } from "mongoose";

interface CreateItemHandlerRequestBodyType {
  ownerID: string;
  collectionID: string;
  itemName: string;
  additionalFields: AdditionalFields;
}

export const createItemHandler = async (req: Request<any, any, CreateItemHandlerRequestBodyType>, res: Response) => {
  const { itemName, ownerID, collectionID, additionalFields } = req.body;
  const collection = await ItemCollection.findById(collectionID);
  if (!collection) return res.status(404).json({ success: false });

  const newItem = await Item.create({
    name: itemName,
    owner: ownerID,
    containerCollection: collectionID,
    additionalFields: additionalFields,
  });

  collection.items.push(newItem._id);
  await collection.save();
  return res.status(200).json({ success: true });
};

export const getItemHandler = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  if (!itemID) return res.status(400).json({ success: false });

  const item = await Item.findById(itemID);
  if (!item) return res.status(404).json({ success: false });

  return res.status(404).json({ success: true, data: item });
};

interface EditItemHandlerRequestBodyType {
  name: string;
  additionalFields: AdditionalFields[];
}

export const editItemHandler = async (req: Request<any, any, EditItemHandlerRequestBodyType>, res: Response) => {
  const { itemID } = req.params;
  const { name, additionalFields } = req.body;
  if (!itemID || !name || !additionalFields) return res.status(400).json({ success: false });

  const item = await Item.findById(itemID);
  if (!item) return res.status(404).json({ success: false });

  item.additionalFields = new Types.DocumentArray<AdditionalFields>(additionalFields);
  item.name = name;
  await item.save();

  return res.status(200).json({ success: true });
};

export const deleteItemHandler = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  if (!itemID) return res.status(400).json({ success: false });

  await Item.deleteOne({ _id: itemID });

  return res.status(200).json({ success: true });
};
