// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  serverId: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  channelId: { type: String, required: true },
  reactionCount: { type: Number, default: 0 },
  capturedAt: { type: Date, default: Date.now }
});

// Compound index for fast queries
messageSchema.index({ messageId: 1, serverId: 1 }, { unique: true });
messageSchema.index({ serverId: 1 });

module.exports = mongoose.model('Message', messageSchema);