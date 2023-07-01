import { Router } from "express";
import {
  createCollectionHandler,
  getCollectionsHandler,
  updateCollectionHandler,
} from "../controllers/collection.controller.js";

const collectionRouter = Router();

collectionRouter.post("/create", createCollectionHandler);
collectionRouter.post("/update", updateCollectionHandler);
collectionRouter.get("/get/:userName", getCollectionsHandler);

export default collectionRouter;
