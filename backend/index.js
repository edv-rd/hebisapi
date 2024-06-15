import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {DB_URL} from "./utils.js"

import Entry from "./Schema.js";

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000; // Change this to your desired port

mongoose.connect(`${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/random', async (req, res) => {

    try {

        let randomEntry =  await Entry.aggregate([
            { $match: { category: req.query.category, active: { $ne: false } } },
            { $sample: { size: 1 } }
        ])

        res.json({ message: `got random from category ${req.query.category}`, response: { entry: randomEntry } });
    } catch (e) {
        res.status(400).send(e);
      }
  });

app.get('/all', async (req, res) => {

    try {
        const allEntries = await Entry.find({
            category: req.query.category,
            active: { $ne: false }
        }).sort({_id:-1});

        res.json({ message: `got all in category ${req.query.category}`, response: { entries: allEntries } });
    } catch (e) {
        res.status(400).send(e);
      }
  });

app.post("/hide", async (req, res) => {
    try {
        console.log(req.body)
        const hiddenEntry = await Entry.findByIdAndUpdate(req.body.id, { active: false })
        res.json({ message: `hidden id ${hiddenEntry}` });
    } catch (e) {
        res.status(400).send(e);
      }
}
)

app.post("/add", async (req, res) => {
    try {
      const newEntry = await new Entry({
        entry: req.body.entry,
        category: req.body.category
      }).save();
      res.status(201).json({
        success: true,
        entry: newEntry
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        response: e,
      });
    }
  });  

app.listen(port, () => {
    console.log(`hebis backend igång på ${port}`);
  });