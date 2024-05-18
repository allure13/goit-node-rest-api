import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  next();
});

const connection = mongoose.connect(dbURI);
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

app.listen(8080, () => {
  console.log("server started on port 3000");
});
