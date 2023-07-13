import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({
  item: {
    type: Types.ObjectId,
    required: true,
    ref: "Item",
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
