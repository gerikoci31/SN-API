const express = require('express');
const router = express.Router();
const { User, Thought } = require('../models/User');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the created thought's _id to the associated user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    // Remove the thought's _id from the associated user's thoughts array
    await User.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });

    res.status(200).json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.reactions.push(req.body);
    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      const reaction = thought.reactions.id(req.params.reactionId);
      if (!reaction) return res.status(404).json({ message: 'Reaction not found' });
  
      reaction.remove();
      await thought.save();
  
      res.status(200).json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;