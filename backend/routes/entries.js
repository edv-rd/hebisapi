import { Router } from "express";
import Entry from "../Schema.js";

const router = Router();

// GET /random
router.get("/random", async (req, res) => {
  try {
    const randomEntry = await Entry.aggregate([
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