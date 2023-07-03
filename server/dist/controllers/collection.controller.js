import Collection from "../schemas/Collection.js";
import User from "../schemas/User.js";
export const createCollectionHandler = async (req, res) => {
    const { userName, name, description, topic, image, additionalCollectionFieldNames, additionalCollectionFieldTypes } = req.body;
    const user = await User.findOne({ username: userName }).populate("collections");
    if (!user)
        return res.status(500).json({ success: false });
    const newCollection = new Collection({
        name: name,
        description: description,
        topic: topic,
        image: image,
        additionalCollectionFieldNames: additionalCollectionFieldNames,
        additionalCollectionFieldTypes: additionalCollectionFieldTypes,
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
    const { id, userName, name, description, topic, image, additionalCollectionFieldNames, additionalCollectionFieldTypes, } = req.body;
    const user = await User.findOne({ username: userName }).populate("collections");
    const collection = await Collection.findById(id);
    if (!collection)
        return res.status(500).json({ success: false });
    if (!user)
        return res.status(500).json({ success: false });
    collection.name = name;
    collection.description = description;
    //@ts-ignore
    collection.topic = topic;
    collection.image = image;
    collection.additionalCollectionFieldNames = additionalCollectionFieldNames;
    collection.additionalCollectionFieldTypes = additionalCollectionFieldTypes;
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
    const collection = await Collection.findById(collectionID);
    if (!collection)
        return res.status(404).json({ success: false, data: null });
    return res.status(200).json({ success: true, data: collection });
};
