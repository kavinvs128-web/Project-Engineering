import Expense from '../models/Expense.js';

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Protected (Should be manager/admin-only)
export const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({}).populate('submittedBy', 'name email');
  res.json(expenses);
};

// @desc    Get current user's expenses
// @route   GET /api/expenses/mine
// @access  Protected
export const getMyExpenses = async (req, res) => {
  const expenses = await Expense.find({ submittedBy: req.user._id });
  res.json(expenses);
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Protected
export const createExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = await Expense.create({
    title,
    amount,
    category,
    submittedBy: req.user._id
  });
  res.status(201).json(expense);
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Protected (Gap 4 — No ownership check)
export const updateExpense = async (req, res) => {
  // ❌ Any user can update any expense — no check: expense.submittedBy === req.user.userId
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(expense);
};

// @desc    Approve an expense
// @route   PUT /api/expenses/:id/approve
// @access  Protected (Should be manager/admin-only)
export const approveExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id, 
    { status: 'approved' }, 
    { new: true }
  );
  res.json(expense);
};

// @desc    Reject an expense
// @route   PUT /api/expenses/:id/reject
// @access  Protected (Should be manager/admin-only)
export const rejectExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id, 
    { status: 'rejected' }, 
    { new: true }
  );
  res.json(expense);
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Protected (Should be admin-only)
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense removed' });
};
