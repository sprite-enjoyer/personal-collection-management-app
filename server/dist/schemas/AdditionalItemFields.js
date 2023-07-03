import mongoose from "mongoose";
const additionalItemFieldsSchema = new mongoose.Schema({
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
