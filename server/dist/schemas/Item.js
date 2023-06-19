import mongoose from "mongoose";
import AdditionalItemFields from "./AdditionalItemFields.js";
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    additionalFields: AdditionalItemFields,
});
export default mongoose.model("Item", itemSchema);
