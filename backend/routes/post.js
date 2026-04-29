import { Router } from "express";
import Post from "../Post";

const router = Router();

router.post('/messages', async (req, res) => {
  const { messageId, serverId, content, authorId, authorName, channelId, reactionCount, capturedAt } = req.body;
  
  await Message.findOneAndUpdate(
    { messageId, serverId },
    { $set: { content, authorId, authorName, channelId, reactionCount, capturedAt } },
    { upsert: true }
  );
  
  res.json({ success: true });
});

// GET /messages/random?serverId=xxx - Get two random messages
router.get('/messages/random', async (req, res) => {
  const { serverId } = req.query;
  
  const messages = await Message.aggregate([
    { $match: { serverId } },
    { $sample: { size: 2 } }
  ]);
  
  res.json({ 
    messages: messages.map(m => ({
      messageId: m.messageId,
      content: m.content,
      authorName: m.authorName,
      reactionCount: m.reactionCount
    }))
  });
});

