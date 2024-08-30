const express = require('express');
const router = express.Router();
const { User, Thought } = require('../models/User.js');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove user's thoughts
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    // Remove user from friends lists of other users
    await User.updateMany(
      { friends: user._id },
      { $pull: { friends: user._id } }
    );

    res.status(200).json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) return res.status(404).json({ message: 'User or friend not found' });

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    if (!friend.friends.includes(user._id)) {
      friend.friends.push(user._id);
      await friend.save();
    }

    res.status(200).json({ message: 'Friend added' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) return res.status(404).json({ message: 'User or friend not found' });

    user.friends.pull(friend._id);
    friend.friends.pull(user._id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend removed' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
