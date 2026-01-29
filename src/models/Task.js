const mongoose = require('mongoose');

const STATUS = ['pending', 'in-progress', 'done'];
const PRIORITY = ['low', 'medium', 'high'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
      minlength: [1, 'title cannot be empty'],
      maxlength: [200, 'title is too long'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'description is too long'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: STATUS,
        message: `status must be one of: ${STATUS.join(', ')}`,
      },
      default: 'pending',
    },
    priority: {
      type: String,
      enum: {
        values: PRIORITY,
        message: `priority must be one of: ${PRIORITY.join(', ')}`,
      },
      default: 'medium',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
