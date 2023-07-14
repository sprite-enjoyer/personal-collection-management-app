import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  editItemHandler,
  getAllTagsHandler,
  getItemHandler,
  getLatestItemsHandler,
} from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.get("/get/:itemID", getItemHandler);
itemRouter.get("/getLatest/:count", getLatestItemsHandler);
itemRouter.get("/tags", getAllTagsHandler);
itemRouter.post("/create", createItemHandler);
itemRouter.post("/edit/:itemID", editItemHandler);
itemRouter.delete("/delete/:itemID", deleteItemHandler);

export default itemRouter;
