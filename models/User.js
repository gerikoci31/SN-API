const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Reaction Schema
const ReactionSchema = new Schema({
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
    get: timestamp => new Date(timestamp).toLocaleDateString() // Format date
  }
});

// Define Thought Schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleDateString() // Format date
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema] // Embed Reaction Schema
});

// Add virtual property for reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Define User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must be a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Add virtual property for friend count
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Thought: mongoose.model('Thought', ThoughtSchema)
};
