import mongoose from "mongoose";

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
});

export default mongoose.model("Collection", collectionSchema);
