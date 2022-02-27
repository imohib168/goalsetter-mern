const asyncHandler = require('express-async-handler');

const Goal = require('./../models/goalModel');
const User = require('./../models/userModel');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Set Goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const newGoal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(200).json(newGoal);
});

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const updateGoal = await Goal.findById(req.params.id);
  if (!updateGoal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (updateGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const removeGoal = await Goal.findById(req.params.id);

  if (!removeGoal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (removeGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await Goal.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};