import mongoose, { Schema, SchemaTypes } from "mongoose";
const additionalItemFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: SchemaTypes.Mixed,
    },
});
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    containerCollection: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ItemCollection",
    },
    additionalFields: {
        type: [additionalItemFieldSchema],
        required: true,
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
export default mongoose.model("Item", itemSchema);
