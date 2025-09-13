import User from "../model/User.js";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "crypto";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, number, password, confirmPassword } = req.body;

    if (!name || !email || !number || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // ✅ Use User model
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Number already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // ✅ Use User model
    const user = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role }, // include role if available
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT with role included
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        role: user.role, // role send kar rahe hain frontend ke liye
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// ✅ Create new user
export const createUser = async (req, res) => {
  try {
    const { name, email, number, password, role } = req.body;
    const user = new User({ name, email, number, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
};

// ✅ Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err });
  }
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err });
  }
};
