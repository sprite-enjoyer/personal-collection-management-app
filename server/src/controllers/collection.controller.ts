import { Request, Response } from "express";
import ItemCollection, { AdditionalFieldInfo } from "../schemas/ItemCollection.js";
import User from "../schemas/User.js";
import { Collection, Types } from "mongoose";
import Item, { AdditionalField } from "../schemas/Item.js";
import { Type } from "typescript";

interface CreateCollectionHandlerBodyType {
  userName: string;
  name: string;
  description: string;
  topic: string;
  image: string;
  additionalFieldsInfo: AdditionalFieldInfo[];
}

export const createCollectionHandler = async (
  req: Request<any, any, CreateCollectionHandlerBodyType>,
  res: Response
) => {
  const { userName, name, description, topic, image, additionalFieldsInfo } = req.body;

  const user = await User.findOne({ username: userName }).populate("collections");
  if (!user) return res.status(500).json({ success: false });

  const newCollection = new ItemCollection({
    name: name,
    description: description,
    topic: topic,
    image: image,
    additionalFieldsInfo: additionalFieldsInfo,
    owner: user?._id,
  });

  if (user.collections.includes(newCollection._id)) return res.status(403).json({ success: false });
  user.collections.push(newCollection._id);
  await newCollection.save();
  await user.save();

  res.status(200).json({ success: true });
};

interface EditCollectionHandlerBodyType extends CreateCollectionHandlerBodyType {
  id: string;
}

export const updateCollectionHandler = async (req: Request<any, any, EditCollectionHandlerBodyType>, res: Response) => {
  const { id, name, description, topic, image, additionalFieldsInfo } = req.body;
  const collection = await ItemCollection.findById(id);
  if (!collection) return res.status(500).json({ success: false });

  // const getFieldDefaultValue = (type: string, date: Date) => {
  //   switch (type) {
  //     case "boolean":
  //       return false;
  //     case "string":
  //     case "multiline":
  //       return "";
  //     case "date":
  //       return date;
  //     case "integer":
  //       return 0;
  //   }
  // };

  const date = new Date();
  const newFields = new Types.DocumentArray<AdditionalField>(
    additionalFieldsInfo
      .filter((info) => !collection.additionalFieldsInfo.map((info) => info.name).includes(info.name))
      .map((info) => {
        return { value: null, ...info };
      })
  );

  await Item.updateMany({}, { $addToSet: { additionalFields: newFields } });

  collection.name = name;
  collection.description = description;
  //@ts-ignore
  collection.topic = topic;
  collection.image = image;
  collection.additionalFieldsInfo = new Types.DocumentArray<AdditionalFieldInfo>(additionalFieldsInfo);

  await collection.save();

  return res.status(200).json({ success: true });
};

export const getUserCollectionsHandler = async (req: Request, res: Response) => {
  const { userName } = req.params;

  const user = await User.findOne({ username: userName }).populate("collections");
  if (!user) return res.status(400).json({ success: false, data: null });

  return res.status(200).json({ success: true, data: user.collections });
};

export const getCollectionHandler = async (req: Request, res: Response) => {
  const { collectionID } = req.params;
  if (!collectionID) return res.status(400).json({ success: false, data: null });

  const collection = await ItemCollection.findById(collectionID).populate("items");

  if (!collection) return res.status(404).json({ success: false, data: null });

  return res.status(200).json({ success: true, data: collection });
};

export const deleteCollectionHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const collectionRemoval = await ItemCollection.deleteOne({ _id: id });
  if (collectionRemoval.acknowledged) return res.status(200).json({ success: true });
  return res.status(500).json({ success: false });
};
