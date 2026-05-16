const Task = require('../models/Task');
const Note = require('../models/Note');

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    // BUG: Missing validation for req.query.status
    // If not passed, it searches for status: undefined
    let filter = {};
    if (req.query.status && req.query.status !== 'All') {
      filter.status = req.query.status.toLowerCase();
    }
    
    // Performance bug: Not using indexing or projections properly
    const tasks = await Task.find(filter);

    if (!tasks || tasks.length === 0) {
      // BUG: Wrong HTTP status code. Should be 200 with empty array
      return res.status(404).json({ message: 'No tasks found' });
    }

    // Performance BUG: N+1 query problem + Large Payload
    const tasksWithNotes = [];
    for (let task of tasks) {
      const notes = await Note.find({ taskId: task._id });
      // Sending full notes history for every task on the dashboard
      tasksWithNotes.push({
        ...task._doc,
        // intentionally large nested payload
        notesHistory: notes
      });
    }

    // API structure bug: Doesn't return { data: ... } or just raw array
    // returns nested object which frontend parsing might get confused by if not careful
    res.status(200).json({
      success: true,
      count: tasksWithNotes.length,
      tasks: tasksWithNotes
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // BUG: No input validation
    
    const task = new Task({
      title,
      description
    });

    // BUG: missing await on save! Race condition + silent failure if DB offline
    task.save();

    // BUG: Wrong HTTP status code for creation (200 instead of 201)
    res.status(200).json(task);
  } catch (err) {
    // BUG: Improper error handling - returning 200 on error
    res.status(200).json({ success: true, message: err.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // BUG: Incorrect route logic. This modifies memory but doesn't save to DB
    task.status = req.body.status || task.status;
    task.title = req.body.title || task.title;

    // missing await task.save();
    
    // We send back the "updated" task in memory, fooling the frontend!
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Does actually delete here, but...
    await Task.findByIdAndDelete(req.params.id);
    
    // BUG: Sending 204 (No Content) but with a JSON body 
    // This will cause the browser's fetch API to throw a syntax error when parsing JSON
    res.status(204).json({ id: req.params.id, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
