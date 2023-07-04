import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  editItemHandler,
  getItemHandler,
} from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.get("/get/:itemID", getItemHandler);
itemRouter.post("/create", createItemHandler);
itemRouter.post("/edit/:itemID", editItemHandler);
itemRouter.delete("/delete/:itemID", deleteItemHandler);

export default itemRouter;
