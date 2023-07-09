import ItemCollection from "../schemas/ItemCollection.js";
import User from "../schemas/User.js";
import { Types } from "mongoose";
import Item from "../schemas/Item.js";
export const createCollectionHandler = async (req, res) => {
    const { userName, name, description, topic, image, additionalFieldsInfo } = req.body;
    const user = await User.findOne({ username: userName }).populate("collections");
    if (!user)
        return res.status(500).json({ success: false });
    const newCollection = new ItemCollection({
        name: name,
        description: description,
        topic: topic,
        image: image,
        additionalFieldsInfo: additionalFieldsInfo,
        owner: user?._id,
    });
    if (user.collections.includes(newCollection._id))
        return res.status(403).json({ success: false });
    user.collections.push(newCollection._id);
    await newCollection.save();
    await user.save();
    res.status(200).json({ success: true });
};
export const updateCollectionHandler = async (req, res) => {
    const { id, name, description, topic, image, additionalFieldsInfo } = req.body;
    const collection = await ItemCollection.findById(id);
    if (!collection)
        return res.status(500).json({ success: false });
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
    const newFields = new Types.DocumentArray(additionalFieldsInfo
        .filter((info) => !collection.additionalFieldsInfo.map((info) => info.name).includes(info.name))
        .map((info) => {
        return { value: null, ...info };
    }));
    console.log("new fields:", newFields, "ayoooooo");
    await Item.updateMany({}, { $addToSet: { additionalFields: newFields } });
    collection.name = name;
    collection.description = description;
    //@ts-ignore
    collection.topic = topic;
    collection.image = image;
    collection.additionalFieldsInfo = new Types.DocumentArray(additionalFieldsInfo);
    await collection.save();
    return res.status(200).json({ success: true });
};
export const getUserCollectionsHandler = async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({ username: userName }).populate("collections");
    if (!user)
        return res.status(400).json({ success: false, data: null });
    return res.status(200).json({ success: true, data: user.collections });
};
export const getCollectionHandler = async (req, res) => {
    const { collectionID } = req.params;
    if (!collectionID)
        return res.status(400).json({ success: false, data: null });
    const collection = await ItemCollection.findById(collectionID).populate("items");
    if (!collection)
        return res.status(404).json({ success: false, data: null });
    return res.status(200).json({ success: true, data: collection });
};
