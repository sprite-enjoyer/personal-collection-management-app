import mongoose from "mongoose";
const multilineTextField = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
export default mongoose.model("MultilineTextField", multilineTextField);
