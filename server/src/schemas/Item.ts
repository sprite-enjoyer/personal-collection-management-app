import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AdditionalItemFields",
  },
});

export default mongoose.model("Item", itemSchema);
