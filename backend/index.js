import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readFile } from 'fs/promises';
import uniqueRandomArray from 'unique-random-array';

import { DB_URL } from "./utils.js";

import Entry from "./Schema.js";
import Result from "./Result.js";

const getWords = async () => {
  const words = JSON.parse(await readFile(new URL('./words.json', import.meta.url)));
  return words;
};

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['https://hebisadmin.onrender.com', 'http://localhost:5173', 'https://puzzlehub.edvardshemsida.se'],
  methods: ['GET', 'POST'],
  credentials: true
}));
const port = 3000; // Change this to your desired port

mongoose.connect(`${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/random", async (req, res) => {
  try {
    let randomEntry = await Entry.aggregate([
      { $match: { category: req.query.category, active: { $ne: false } } },
      { $sample: { size: 1 } },
    ]);

    res.json({
      message: `got random from category ${req.query.category}`,
      response: { entry: randomEntry },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/all", async (req, res) => {
  try {
    const allEntries = await Entry.find({
      category: req.query.category,
    }).sort({ _id: -1 });

    res.json({
      message: `got all in category ${req.query.category}`,
      response: { entries: allEntries },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/wordle", async (req, res) => {
  try {
    const words = await getWords();
    const random = uniqueRandomArray(words);
    
    res.json({
      success: true,
      word: random()
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message
    });
  }
});

app.post("/hide", async (req, res) => {
  try {
    const hiddenEntry = await Entry.findByIdAndUpdate(
      req.body.id,
      [{ $set: { active: { $eq: [false, "$active"] } } }],
      { new: true }
    );
    res.json({ 
      message: `Entry ${hiddenEntry._id} active status changed to ${hiddenEntry.active}` 
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/hideall", async (req, res) => {
  try {
    const hiddenEntry = await Entry.updateMany({
      category: req.body.category,
    }, { $set: { active: false } })
    
    res.json({ 
      message: `Entry ${hiddenEntry._id} active status changed to ${hiddenEntry.active}` 
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/enableall", async (req, res) => {
  try {
    const hiddenEntry = await Entry.updateMany({
      category: req.body.category,
    }, { $set: { active: true } })
    
    res.json({ 
      message: `Entry ${hiddenEntry._id} active status changed to ${hiddenEntry.active}` 
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/add", async (req, res) => {
  try {
    const newEntry = await new Entry({
      entry: req.body.entry,
      category: req.body.category,
      active: true,
    }).save();

    res.status(201).json({
      success: true,
      entry: {
        _id: newEntry._id,
        entry: newEntry.entry,
        active: newEntry.active,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e,
    });
  }
});

app.post("/puzzlehub/add", async (req, res) => {
  try {
    const { username, date, results } = req.body;

    const promises = results.map(async (result) => {
      const existingResult = await Result.findOne({
        game: result.gameName,
        username: username,
        date: date,
      });

      if (!existingResult) {
        await new Result({
          result: result.result,
          game: result.gameName,
          username: username,
          date: date,
        }).save();
      }
    });

    await Promise.all(promises);

    res.status(201).json({
      success: true,
      message: "Results processed successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e,
    });
  }
});

app.get("/puzzlehub/today", async (req, res) => {
  try {
    const queryDate = req.query.date;
    const queryGame = req.query.game;

    const allEntries = await Result.find({
      date: queryDate,
      game: queryGame,
    }).sort({ _id: -1 });

    // console.log(`Found ${allEntries.length} entries for ${queryGame} on ${queryDate}`);

    res.json({ response: { allEntries } });
  } catch (e) {
    console.error('Error:', e);
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`hebis backend igång på ${port}`);
});
