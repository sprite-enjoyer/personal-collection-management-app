import Item from "../schemas/Item.js";
import ItemCollection from "../schemas/ItemCollection.js";
import { Types } from "mongoose";
import Comment from "../schemas/Comment.js";
export const createItemHandler = async (req, res) => {
    const { itemName, ownerID, collectionID, additionalFields, tags } = req.body;
    const collection = await ItemCollection.findById(collectionID);
    if (!collection)
        return res.status(404).json({ success: false });
    const trimStuff = (field) => field.type === "string" || field.type === "multiline"
        ? { ...field, value: field.value.trim() }
        : { ...field, value: field.value };
    const trimmedAdditionalFields = additionalFields.filter(trimStuff);
    const newItem = await Item.create({
        name: itemName.trim(),
        owner: ownerID,
        containerCollection: collectionID,
        additionalFields: trimmedAdditionalFields,
        tags: tags.map((tag) => tag.trim()),
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
/** The reason this function is so big and ugly is that MongoDB free tier doesn't allow $where queries. */
export const getSearchedItemsHandler = async (req, res) => {
    const { searchValues } = req.body;
    const regularInputs = [];
    const tagInputs = [];
    if (searchValues.length === 0)
        return res.status(200).json({ data: [] });
    searchValues.forEach((input) => input.startsWith("tag:")
        ? tagInputs.push(input.substring(4).trim().toLowerCase())
        : regularInputs.push(input.trim().toLowerCase()));
    const [items, comments] = await Promise.all([Item.find({}), Comment.find({})]);
    const plainItems = items.map((i) => i.toObject());
    const omitDateAndBooleanFields = (field) => field.type !== "date" && field.type !== "boolean";
    const valuesToStrings = (field) => {
        return { ...field, value: field.value?.toString().toLowerCase() ?? "" };
    };
    const processedItems = plainItems.map((item) => {
        const newAdditionalFields = item.additionalFields
            .filter(omitDateAndBooleanFields)
            .map(valuesToStrings);
        return { ...item, additionalFields: newAdditionalFields };
    });
    const itemsFilteredByFieldValues = processedItems.filter((item) => {
        const data = [
            ...item.additionalFields,
            { name: "name", type: "string", value: item.name.trim() },
        ];
        for (let i = 0; i < data.length; i++)
            if (regularInputs.includes(data[i].value.toLowerCase()))
                return true;
        return false;
    });
    const itemsFilteredByTags = processedItems.filter((item) => {
        for (let i = 0; i < item.tags.length; i++)
            if (tagInputs.includes(item.tags[i]))
                return true;
        return false;
    });
    const uniqueItemsFilteredByTags = itemsFilteredByTags.filter((item) => !itemsFilteredByFieldValues.map((item) => item._id).includes(item._id));
    const finalItems = [...uniqueItemsFilteredByTags, ...itemsFilteredByFieldValues];
    const populatedItems = await Promise.all(finalItems.map((item) => Item.findById(item._id).populate(["containerCollection", "owner"]).exec()));
    const populatedItemIDs = populatedItems
        .filter((item) => !!item)
        .map((item) => item?._id)
        .filter((id) => {
        if (typeof id === "undefined")
            return false;
        return true;
    });
    const checkSubstringInArray = (str, arr) => {
        for (let i = 0; i <= str.length - 4; i++) {
            const substring = str.substring(i, 4);
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].includes(substring)) {
                    return true;
                }
            }
        }
        return false;
    };
    const commentsFromOtherItems = comments.filter((comment) => !populatedItemIDs.includes(comment._id));
    let commentsContainingSearchValuesItemIDs = [];
    if (populatedItems.length < 10) {
        commentsContainingSearchValuesItemIDs = Array.from(new Set(commentsFromOtherItems
            .filter((comment) => checkSubstringInArray(comment.text.toLocaleLowerCase(), regularInputs))
            .map((comment) => comment.item.toString())));
    }
    const itemsFromCommentResults = await Promise.all(commentsContainingSearchValuesItemIDs.map((id) => Item.findById(id).populate(["containerCollection", "owner"]).exec()));
    populatedItems.push(...itemsFromCommentResults);
    const finalIDs = Array.from(new Set(populatedItemIDs.map((item) => item._id)));
    const uniqueResults = await Promise.all(finalIDs.map((id) => Item.findById(id).populate(["owner", "containerCollection"]).exec()));
    return res.status(200).json({ data: uniqueResults.filter((item) => item !== null) });
};
export const likeItemHandler = async (req, res) => {
    const { itemID, userID } = req.body;
    const item = await Item.findByIdAndUpdate(itemID, { $addToSet: { usersWhoLikeItem: userID } }, { new: true });
    if (!item)
        return res.status(500).json({ data: null });
    return res.status(200).json({ data: item });
};
export const unLikeItemHandler = async (req, res) => {
    const { itemID, userID } = req.body;
    const item = await Item.findByIdAndUpdate(itemID, { $pull: { usersWhoLikeItem: userID } }, { new: true });
    if (!item)
        return res.status(500).json({ data: null });
    return res.status(200).json({ data: item });
};
