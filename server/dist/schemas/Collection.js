import mongoose from "mongoose";
import AdditionalItemFieldInfo from "./AdditionalItemFieldInfo.js";
const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    image: String,
    additionalCollectionFields: {
        type: [AdditionalItemFieldInfo],
        default: [],
    },
});
export default mongoose.model("Collection", collectionSchema);
