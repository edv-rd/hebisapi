import { Router } from "express";
import { readFile } from "fs/promises";
import uniqueRandomArray from "unique-random-array";

const router = Router();

const getWords = async () => {
  const words = JSON.parse(
    await readFile(new URL("../words.json", import.meta.url))
  );
  return words;
};

// GET /wordle
router.get("/", async (req, res) => {
  try {
    const words = await getWords();
    const random = uniqueRandomArray(words);

    res.json({
      success: true,
      word: random(),
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;