const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(`Submitted data: ${ name, email, password, role }`);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};


const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    // Build update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    next(error);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //Debugging lines

    console.log(`Request body: ${req.body.email}, ${req.body.password}`);
    console.log(`Saved Data: ${user}`);
    console.log(`Sent passwod: ${password} === ${req.body.password}`);
    if (!user) return res.status(400).json({ message: `User with ${email} does not exist!` });

    // const isMatch = await bcrypt.compare(req.body.password, user.password);
    // if (!isMatch) return res.status(400).json({ message: 'Invalid credentials, password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {register, getAllUsers, getUserById, updateUser, deleteUser, login};