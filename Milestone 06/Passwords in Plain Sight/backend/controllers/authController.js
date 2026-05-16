import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// @desc    Register user
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Password stored directly — no hashing
    const user = await User.create({
      email,
      password, // plain text stored here
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(201).json({ token, user: { id: user._id, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Authenticate user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Direct string comparison — unsafe
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({ token, user: { id: user._id, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
