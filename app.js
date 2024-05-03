import express from "express";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(cors());

app.listen(8080, () => {
  console.log("server started on port 8080");
});
