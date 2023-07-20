import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  editItemHandler,
  getAllTagsHandler,
  getItemHandler,
  getLatestItemsHandler,
  getSearchedItemsHandler,
  likeItemHandler,
  unLikeItemHandler,
} from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.get("/get/:itemID", getItemHandler);
itemRouter.get("/getLatest/:count", getLatestItemsHandler);
itemRouter.get("/tags", getAllTagsHandler);

itemRouter.post("/create", createItemHandler);
itemRouter.post("/search", getSearchedItemsHandler);
itemRouter.post("/like", likeItemHandler);
itemRouter.post("/unlike", unLikeItemHandler);

itemRouter.post("/edit/:itemID", editItemHandler);
itemRouter.delete("/delete/:itemID", deleteItemHandler);

export default itemRouter;
