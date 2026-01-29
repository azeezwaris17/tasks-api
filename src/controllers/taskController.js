const mongoose = require('mongoose');
const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

function pickUpdatableFields(body) {
  const allowed = ['title', 'description', 'status', 'priority'];
  const updates = {};

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(body, key) && body[key] !== undefined) {
      updates[key] = body[key];
    }
  }

  return updates;
}

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body || {};

  const created = await Task.create({ title, description, status, priority });

  res.status(201).json(created);
});

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    res.status(400);
    throw new Error('Invalid task id');
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    res.status(400);
    throw new Error('Invalid task id');
  }

  const updates = pickUpdatableFields(req.body || {});

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const updated = await Task.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json(updated);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    res.status(400);
    throw new Error('Invalid task id');
  }

  const deleted = await Task.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json({ message: 'Task deleted' });
});
