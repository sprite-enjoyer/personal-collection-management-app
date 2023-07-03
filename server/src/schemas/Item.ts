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
  additionalFields: {
    type: Schema.Types.ObjectId,
    ref: "AdditionalItemFields",
  },
});

export default mongoose.model("Item", itemSchema);
