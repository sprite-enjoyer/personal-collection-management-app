import mongoose from "mongoose";
const additionalItemFieldInfoSchema = new mongoose.Schema({
    names: [String],
    types: [String],
});
export default mongoose.model("AdditionalItemFieldInfo", additionalItemFieldInfoSchema);
