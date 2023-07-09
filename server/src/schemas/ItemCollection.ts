import mongoose, { InferSchemaType, Schema } from "mongoose";

const additionalFieldInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["string", "multiline", "integer", "date", "boolean"],
    required: true,
  },
});

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: allowEmptyStrings,
  },
  topic: {
    type: String,
    required: true,
    enum: [
      "Books",
      "Coins",
      "Stamps",
      "Postcards",
      "Comics",
      "Action Figures",
      "Trading Cards",
      "Vinyl Records",
      "Movie Memorabilia",
      "Sports Jerseys",
      "Autographs",
      "Art Prints",
      "Antique Furniture",
      "Vintage Clothing",
      "Toy Cars",
      "Dolls",
      "Model Trains",
      "Musical Instruments",
      "Movie Props",
      "Fine China",
      "Wristwatches",
      "Jewelry",
      "Comic Books",
      "Bottles",
      "Sports Memorabilia",
      "Board Games",
      "Vintage Cameras",
      "Sneakers",
      "Figurines",
      "Vinyl Toys",
      "Vintage Posters",
      "Concert Tickets",
      "Vintage Magazines",
      "Musical Records",
      "Action Cameras",
      "Snow Globes",
      "Candles",
      "Shot Glasses",
      "Beer Steins",
      "Vintage Maps",
      "Pocket Knives",
      "Keychains",
      "Trading Pins",
      "Artifacts",
      "Antique Clocks",
      "Hats",
      "Lighters",
      "Fountain Pens",
      "Vintage Telephones",
      "Vinyl Music Albums",
      "Other",
    ],
  },
  image: String,
  additionalFieldsInfo: {
    type: [additionalFieldInfoSchema],
    default: [],
    required: true,
  },
  items: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    default: [],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

function allowEmptyStrings() {
  //@ts-ignore
  return !(typeof this.description === "string");
}

export type AdditionalFieldInfo = InferSchemaType<typeof additionalFieldInfoSchema>;

export default mongoose.model("ItemCollection", collectionSchema);
