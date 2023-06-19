import mongoose from "mongoose";
const stringFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
export default mongoose.model("StringField", stringFieldSchema);
