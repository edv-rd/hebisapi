import { Router } from "express";
import Post from "../Post.js";

const router = Router();

router.post("/add", async (req, res) => {
  const {
    messageId,
    serverId,
    content,
    authorId,
    authorName,
    channelId,
    reactionCount,
    emoji,
    capturedAt,
  } = req.body;

  try {
    await Post.findOneAndUpdate(
      { messageId, serverId },
      {
        $set: {
          content,
          authorId,
          authorName,
          channelId,
          reactionCount,
          emoji,
          capturedAt,
        },
      },
      { upsert: true },
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("DB /add error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

// GET /messages/random?serverId=xxx - Get two random messages
router.get("/random", async (req, res) => {
  const { serverId } = req.query;

  const messages = await Post.aggregate([
    { $match: { serverId } },
    { $sample: { size: 2 } },
  ]);

  res.json({
    messages: messages.map((m) => ({
      messageId: m.messageId,
      content: m.content,
      authorName: m.authorName,
      reactionCount: m.reactionCount,
      emoji: m.emoji,
    })),
  });
});

export default router;
