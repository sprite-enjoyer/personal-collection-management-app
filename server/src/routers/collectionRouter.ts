import { Router } from "express";
import {
  createCollectionHandler,
  deleteCollectionHandler,
  getCollectionHandler,
  getUserCollectionsHandler,
  updateCollectionHandler,
} from "../controllers/collection.controller.js";

const collectionRouter = Router();

collectionRouter.post("/create", createCollectionHandler);
collectionRouter.post("/update", updateCollectionHandler);
collectionRouter.get("/getUserCollections/:userName", getUserCollectionsHandler);
collectionRouter.get("/getCollection/:collectionID", getCollectionHandler);
collectionRouter.delete("/delete/:id", deleteCollectionHandler);

export default collectionRouter;
