import { Router } from "express";
import Entry from "../Schema.js";

const router = Router();

// GET /random
router.get("/random", async (req, res) => {
  console.log("Category requested:", req.query.category);
  try {
    const randomEntry = await Entry.aggregate([
      { $match: { category: req.query.category, active: { $ne: false } } },
      { $sample: { size: 1 } },
    ]);

    if (!randomEntry.length) {
      return res.status(404).json({
        message: `no active entries found for category ${req.query.category}`,
      });
    }

    const picked = randomEntry[0];
    console.log("Picked entry from aggregate:", picked);

    // mark this entry as inactive (one-time use)
    const updated = await Entry.findByIdAndUpdate(
      picked._id,
      { $set: { active: false } },
      { new: true }
    );

    console.log("Updated entry:", updated);

    res.json({
      message: `got random from category ${req.query.category}`,
      response: { entry: updated },
    });
  } catch (e) {
    console.error("Error in /random:", e);
    res.status(400).send(e);
  }
});

// GET /all
router.get("/all", async (req, res) => {
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

// POST /add
router.post("/add", async (req, res) => {
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

// POST /hide (toggle active for one)
router.post("/hide", async (req, res) => {
  try {
    const hiddenEntry = await Entry.findByIdAndUpdate(
      req.body.id,
      [{ $set: { active: { $eq: [false, "$active"] } } }],
      { new: true }
    );
    res.json({
      message: `Entry ${hiddenEntry._id} active status changed to ${hiddenEntry.active}`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /hideall
router.post("/hideall", async (req, res) => {
  try {
    await Entry.updateMany(
      { category: req.body.category },
      { $set: { active: false } }
    );

    res.json({
      message: `All entries in ${req.body.category} set to inactive`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /enableall
router.post("/enableall", async (req, res) => {
  try {
    await Entry.updateMany(
      { category: req.body.category },
      { $set: { active: true } }
    );

    res.json({
      message: `All entries in ${req.body.category} set to active`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;