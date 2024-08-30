const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleDateString()
      }
    }
  ]
});

module.exports = mongoose.model('Thought', ThoughtSchema);
