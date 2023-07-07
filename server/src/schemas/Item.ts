import mongoose, { Schema } from "mongoose";

const stringFieldSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const multilineTextFieldSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const booleanFieldSchema = new mongoose.Schema({
  name: String,
  value: Boolean,
});

const integerFieldSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const dateFieldSchema = new mongoose.Schema({
  name: String,
  value: Date,
});

const additionalItemFieldsSchema = new mongoose.Schema({
  dateFields: [dateFieldSchema],
  integerFields: [integerFieldSchema],
  stringFields: [stringFieldSchema],
  multilineTextFields: [multilineTextFieldSchema],
  booleanFields: [booleanFieldSchema],
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
    type: additionalItemFieldsSchema,
    required: true,
  },
});

export default mongoose.model("Item", itemSchema);
