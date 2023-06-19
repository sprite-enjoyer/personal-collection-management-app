import mongoose from "mongoose";

const additionalItemFieldInfoSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["integer", "string", "multiline", "boolean", "date"],
  },
});

export default mongoose.model("AdditionalItemFieldInfo", additionalItemFieldInfoSchema);
