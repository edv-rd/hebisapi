import { Router } from "express";
import Result from "../Result.js";

const router = Router();

// POST /puzzlehub/add
router.post("/add", async (req, res) => {
  try {
    const { username, date, results } = req.body;

    const promises = results.map(async (result) => {
      const existingResult = await Result.findOne({
        game: result.gameName,
        username,
        date,
      });

      if (!existingResult) {
        await new Result({
          result: result.result,
          game: result.gameName,
          username,
          date,
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

// GET /puzzlehub/today
router.get("/today", async (req, res) => {
  try {
    const queryDate = req.query.date;
    const queryGame = req.query.game;

    const allEntries = await Result.find({
      date: queryDate,
      game: queryGame,
    }).sort({ _id: -1 });

    res.json({ response: { allEntries } });
  } catch (e) {
    console.error("Error:", e);
    res.status(400).send(e);
  }
});

export default router;