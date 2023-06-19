import mongoose from "mongoose";

const dateFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("DateField", dateFieldSchema);
