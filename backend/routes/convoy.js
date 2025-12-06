import { Router } from "express";
import Entry from "../Schema.js";

const router = Router();

// GET /convoy
router.get("/", async (req, res) => {
  try {
    const convoyEntry = await Entry.findOne({ category: "convoy" });

    if (!convoyEntry) {
      return res.status(404).json({ message: "convoy not found" });
    }

    const currentValue = parseInt(convoyEntry.entry, 10) || 0;
    const newValue = currentValue + 1;

    convoyEntry.entry = newValue.toString();
    await convoyEntry.save();

    res.json({
      message: "got convoy",
      response: { entry: newValue.toString() },
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;