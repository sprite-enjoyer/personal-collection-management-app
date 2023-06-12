import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const PORT = 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.listen(PORT, () => {
  console.log("server started at port: ", PORT, "!");
})
