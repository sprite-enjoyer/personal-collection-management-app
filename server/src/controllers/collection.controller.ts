import { Request, Response } from "express";
import Collection from "../schemas/Collection.js";
import User from "../schemas/User.js";

interface CreateCollectionHandlerBodyType {
  userName: string;
  name: string;
  description: string;
  topic: string;
  image: string;
  additionalCollectionFieldNames: string[];
  additionalCollectionFieldTypes: string[];
}

export const createCollectionHandler = async (
  req: Request<any, any, CreateCollectionHandlerBodyType>,
  res: Response
) => {
  console.log(req.body, "BODY!!!!!!!!");
  const { userName, name, description, topic, image, additionalCollectionFieldNames, additionalCollectionFieldTypes } =
    req.body;

  const user = await User.findOne({ username: userName }).populate("collections");
  if (!user) return res.status(500).json({ success: false });

  const newCollection = new Collection({
    name: name,
    description: description,
    topic: topic,
    image: image,
    additionalCollectionFieldNames: additionalCollectionFieldNames,
    additionalCollectionFieldTypes: additionalCollectionFieldTypes,
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
  const {
    id,
    userName,
    name,
    description,
    topic,
    image,
    additionalCollectionFieldNames,
    additionalCollectionFieldTypes,
  } = req.body;

  const user = await User.findOne({ username: userName }).populate("collections");
  const collection = await Collection.findById(id);

  console.log(user, collection, "heyyy");
  if (!collection) return res.status(500).json({ success: false });
  if (!user) return res.status(500).json({ success: false });

  collection.name = name;
  collection.description = description;
  collection.topic = topic;
  collection.image = image;
  collection.additionalCollectionFieldNames = additionalCollectionFieldNames;
  collection.additionalCollectionFieldTypes = additionalCollectionFieldTypes;

  await collection.save();

  return res.status(200).json({ success: true });
};
