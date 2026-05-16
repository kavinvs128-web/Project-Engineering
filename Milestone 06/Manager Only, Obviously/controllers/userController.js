import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Protected (Should be admin-only)
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Protected (Should be admin-only)
export const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Protected
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
