const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // BUG: Missing unique constraint causes duplicates
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
    // BUG: No enum validation, can be set to anything
  },
}, {
  timestamps: true
});

// BUG: Missing indexing for frequently queried fields like status

module.exports = mongoose.model('Task', taskSchema);
