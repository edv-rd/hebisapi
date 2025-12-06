import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { DB_URL } from "./utils.js";

// models just need to be imported once so mongoose registers them
import Entry from "./Schema.js";
import Result from "./Result.js";

// routers
import entriesRouter from "./routes/entries.js";
import puzzlehubRouter from "./routes/puzzlehub.js";
import convoyRouter from "./routes/convoy.js";
import wordleRouter from "./routes/wordle.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://hebisadmin.onrender.com",
      "http://localhost:5173",
      "https://puzzlehub.edvardshemsida.se",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const port = 3000;

mongoose.connect(`${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// mount routers
app.use("/entries", entriesRouter);          // /random, /all, /add, /hide, /hideall, /enableall
app.use("/puzzlehub", puzzlehubRouter); // /puzzlehub/add, /puzzlehub/today
app.use("/convoy", convoyRouter);       // /convoy
app.use("/wordle", wordleRouter);       // /wordle

app.listen(port, () => {
  console.log(`hebis backend igång på ${port}`);
});
