import Item from "../schemas/Item.js";
import ItemCollection from "../schemas/ItemCollection.js";
import { Types } from "mongoose";
export const createItemHandler = async (req, res) => {
    const { itemName, ownerID, collectionID, additionalFields, tags } = req.body;
    const collection = await ItemCollection.findById(collectionID);
    if (!collection)
        return res.status(404).json({ success: false });
    const newItem = await Item.create({
        name: itemName,
        owner: ownerID,
        containerCollection: collectionID,
        additionalFields: additionalFields,
        tags: tags,
        createdAt: new Date(),
    });
    collection.items.push(newItem._id);
    await collection.save();
    return res.status(200).json({ success: true });
};
export const getItemHandler = async (req, res) => {
    const { itemID } = req.params;
    if (!itemID)
        return res.status(400).json({ success: false });
    const item = await Item.findById(itemID);
    if (!item)
        return res.status(404).json({ success: false });
    return res.status(200).json({ success: true, data: item });
};
export const editItemHandler = async (req, res) => {
    const { itemID } = req.params;
    const { name, additionalFields, tags } = req.body;
    if (!itemID || !name || !additionalFields)
        return res.status(400).json({ success: false });
    const item = await Item.findById(itemID);
    if (!item)
        return res.status(404).json({ success: false });
    item.additionalFields = new Types.DocumentArray(additionalFields);
    item.name = name;
    item.tags = tags;
    await item.save();
    return res.status(200).json({ success: true });
};
export const deleteItemHandler = async (req, res) => {
    const { itemID } = req.params;
    if (!itemID)
        return res.status(400).json({ success: false });
    await Item.deleteOne({ _id: itemID });
    return res.status(200).json({ success: true });
};
export const getLatestItemsHandler = async (req, res) => {
    const { count } = req.params;
    const countNumber = parseInt(count);
    if (isNaN(countNumber))
        return res.status(400).json({ success: false, data: [] });
    const latestItems = await Item.find()
        .sort({ createdAt: -1 })
        .limit(countNumber)
        .populate(["owner", "containerCollection"]);
    return res.status(200).json({ success: true, data: latestItems });
};
export const getAllTagsHandler = async (req, res) => {
    const itemTags = (await Item.find({}, "tags")).map((e) => e.tags);
    if (!itemTags)
        return res.status(500).json({ success: false, data: [] });
    const uniqueTags = [...new Set(itemTags.flat())];
    return res.status(200).json({ success: true, data: uniqueTags });
};
