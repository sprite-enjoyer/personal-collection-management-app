import mongoose from "mongoose";
const integerFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});
export default mongoose.model("IntegerField", integerFieldSchema);
