import mongoose from "mongoose";

const booleanFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("BooleanField", booleanFieldSchema);
