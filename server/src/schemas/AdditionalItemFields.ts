import mongoose, { InferSchemaType } from "mongoose";
import { AdditionalFields } from "../types.js";

const additionalItemFieldsSchema = new mongoose.Schema<AdditionalFields>({
  stringFieldNames: {
    type: [String],
    default: [],
  },
  stringFieldValues: {
    type: [String],
    default: [],
  },
  booleanFieldNames: {
    type: [String],
    default: [],
  },
  booleanFieldValues: {
    type: [Boolean],
    default: [],
  },
  multilineTextFieldNames: {
    type: [String],
    default: [],
  },
  multilineTextFieldValues: {
    type: [String],
    default: [],
  },
  dateFieldNames: {
    type: [String],
    default: [],
  },
  dateFieldValues: {
    type: [Date],
    default: [],
  },
  integerFieldNames: {
    type: [String],
    default: [],
  },
  integerFieldValues: {
    type: [Number],
    default: [],
  },
});

export default mongoose.model("AdditionalItemFields", additionalItemFieldsSchema);
