import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({
  item: {
    type: Types.ObjectId,
    required: true,
    ref: "Item",
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
