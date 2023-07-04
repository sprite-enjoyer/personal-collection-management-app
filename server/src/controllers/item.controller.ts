import { Request, Response } from "express";
import { AdditionalFields } from "../types.js";
import Item from "../schemas/Item.js";
import AdditionalItemFields from "../schemas/AdditionalItemFields.js";
import ItemCollection from "../schemas/ItemCollection.js";

interface CreateItemHandlerRequestBodyType {
  itemName: string;
  ownerID: string;
  collectionID: string;
  additionalFields: AdditionalFields;
  tags?: string[];
}
export const createItemHandler = async (req: Request<any, any, CreateItemHandlerRequestBodyType>, res: Response) => {
  const { itemName, tags, ownerID, collectionID, additionalFields } = req.body;

  const newAdditionalFields = await AdditionalItemFields.create({
    stringFieldNames: additionalFields.stringFieldNames,
    stringFieldValues: additionalFields.stringFieldValues,
    booleanFieldNames: additionalFields.booleanFieldNames,
    booleanFieldValues: additionalFields.booleanFieldValues,
    integerFieldNames: additionalFields.integerFieldNames,
    integerFieldValues: additionalFields.integerFieldValues,
    multilineTextFieldNames: additionalFields.multilineTextFieldNames,
    multilineTextFieldValues: additionalFields.multilineTextFieldValues,
    dateFieldNames: additionalFields.dateFieldNames,
    dateFieldValues: additionalFields.dateFieldValues,
  });

  const collection = await ItemCollection.findById(collectionID);
  if (!collection) return res.status(404).json({ success: false });

  const newItem = await Item.create({
    name: itemName,
    tags: tags,
    owner: ownerID,
    containerCollection: collectionID,
    additionalFields: newAdditionalFields._id,
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
  additionalFields: AdditionalFields;
  tags: string[];
}

export const editItemHandler = async (req: Request<any, any, EditItemHandlerRequestBodyType>, res: Response) => {
  const { itemID } = req.params;
  const { name, additionalFields, tags } = req.body;
  if (!itemID || !name || !additionalFields || !tags) return res.status(400).json({ success: false });

  const item = await Item.findById(itemID);
  if (!item) return res.status(404).json({ success: false });

  const dbAdditionalFields = await AdditionalItemFields.findById(item.additionalFields._id);
  if (!dbAdditionalFields) return res.status(404).json({ success: false });

  Object.assign(dbAdditionalFields, additionalFields);
  await dbAdditionalFields.save();

  item.name = name;
  item.tags = tags;
  await item.save();

  return res.status(200).json({ success: true });
};

export const deleteItemHandler = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  if (!itemID) return res.status(400).json({ success: false });

  await Item.deleteOne({ _id: itemID });

  return res.status(200).json({ success: true });
};
