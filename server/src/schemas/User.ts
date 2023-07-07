import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  collections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ItemCollection",
    default: [],
  },
});

export default mongoose.model("User", userSchema);
