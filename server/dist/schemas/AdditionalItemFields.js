import mongoose from "mongoose";
import StringField from "./StringField.js";
import BooleanField from "./BooleanField.js";
import IntegerField from "./IntegerField.js";
import MultilineTextField from "./MultilineTextField.js";
import DateField from "./DateField.js";
const additionalItemFieldsSchema = new mongoose.Schema({
    stringFields: {
        type: [StringField],
        default: [],
    },
    booleanFields: {
        type: [BooleanField],
        default: [],
    },
    integerFields: {
        type: [IntegerField],
        default: [],
    },
    multilineTextFields: {
        type: [MultilineTextField],
        default: [],
    },
    dateFields: {
        type: [DateField],
        default: [],
    },
});
export default mongoose.model("AdditionalItemFields", additionalItemFieldsSchema);
