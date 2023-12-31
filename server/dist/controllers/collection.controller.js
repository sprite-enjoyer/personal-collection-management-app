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
    const newFields = new Types.DocumentArray(additionalFieldsInfo
        .filter((info) => !collection.additionalFieldsInfo.map((info) => info.name).includes(info.name))
        .map((info) => {
        return { value: null, ...info };
    }));
    const removedFields = collection.additionalFieldsInfo
        .toObject()
        .filter((info) => !additionalFieldsInfo.map((info) => info.name).includes(info.name))
        .map((res) => {
        return { ...res, value: null };
    });
    await Item.updateMany({ containerCollection: id }, { $addToSet: { additionalFields: newFields } });
    const items = await Item.find({ containerCollection: id });
    const modifiedItems = [];
    items.forEach(async (item) => {
        const newAdditionalFields = new Types.DocumentArray(item.additionalFields.filter((field) => !removedFields.map((field) => field.name).includes(field.name)));
        item.additionalFields = newAdditionalFields;
        modifiedItems.push(item);
    });
    await Promise.all(modifiedItems.map((item) => item.save()));
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
export const deleteCollectionHandler = async (req, res) => {
    const { id } = req.params;
    const collectionRemoval = await ItemCollection.deleteOne({ _id: id });
    if (collectionRemoval.acknowledged)
        return res.status(200).json({ success: true });
    return res.status(500).json({ success: false });
};
export const getLargestCollectionsHandler = async (req, res) => {
    const { count } = req.params;
    const countNumber = parseInt(count);
    if (isNaN(countNumber))
        return res.status(400).json({ success: false, data: [] });
    const biggestCollections = await ItemCollection.aggregate([
        { $project: { items: 1, image: 1, topic: 1, description: 1, name: 1, length: { $size: "$items" } } },
        { $sort: { length: -1 } },
        { $limit: countNumber },
    ]);
    return res.status(200).json({ success: true, data: biggestCollections });
};
