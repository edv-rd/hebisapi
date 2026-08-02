import { Router } from "express";
import Element from "../models/Element.js";

const router = Router();

// GET /random
router.get("/random", async (req, res) => {
  const { type } = req.query;
  console.log("Type requested:", type);

  try {
    const randomElement = await Element.aggregate([
      { $match: { type, active: { $ne: false } } },
      { $sample: { size: 1 } },
    ]);

    if (!randomElement.length) {
      return res.status(404).json({
        message: `no active entries found for type ${type}`,
      });
    }

    const picked = randomElement[0];
    console.log("Picked Element from aggregate:", picked);

    let responseElement = picked;

  

    res.json({
      message: `got random from type ${type}`,
      response: { element: responseElement },
    });
  } catch (e) {
    console.error("Error in /random:", e);
    res.status(400).send(e);
  }
});

// GET /all
router.get("/all", async (req, res) => {
  try {
    const allElements = await Element.find({
      type: req.query.type,
    }).sort({ _id: -1 });

    res.json({
      message: `got all in type ${req.query.type}`,
      response: { elements: allElements },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /add
router.post("/add", async (req, res) => {
  const { content, type } = req.body;

  if (!type || typeof type !== "string" || !type.trim()) {
    return res.status(400).json({
      success: false,
      message: "type cannot be empty",
    });
  }

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "content cannot be empty",
    });
  }

  try {
    const newElement = await new Element({
      content: content.trim(),
      type: type.trim(),
    }).save();

    res.status(201).json({
      success: true,
      element: {
        _id: newElement._id,
        content: newElement.content,
        type: newElement.type,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e.message || e,
    });
  }
});

// POST /hide (toggle active for one)
router.post("/hide", async (req, res) => {
  try {
    const hiddenElement = await Element.findByIdAndUpdate(
      req.body.id,
      [{ $set: { active: { $eq: [false, "$active"] } } }],
      { new: true }
    );
    res.json({
      message: `Element ${hiddenElement._id} active status changed to ${hiddenElement.active}`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /hideall
router.post("/hideall", async (req, res) => {
  try {
    await Element.updateMany(
      { category: req.body.category },
      { $set: { active: false } }
    );

    res.json({
      message: `All elements in ${req.body.category} set to inactive`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /enableall
router.post("/enableall", async (req, res) => {
  try {
    await Element.updateMany(
      { category: req.body.category },
      { $set: { active: true } }
    );

    res.json({
      message: `All elements in ${req.body.category} set to active`,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;