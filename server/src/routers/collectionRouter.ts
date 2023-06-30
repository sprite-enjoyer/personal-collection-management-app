import { Router } from "express";
import { createCollectionHandler, updateCollectionHandler } from "../controllers/collection.controller.js";

const collectionRouter = Router();

collectionRouter.post("/create", createCollectionHandler);
collectionRouter.post("/update", updateCollectionHandler);

export default collectionRouter;
