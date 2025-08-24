import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.util.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return successResponse(res, 200, {
      user: userWithoutPassword,
      token: token,
    });

  } catch (err) {
    next(err);
  }
};


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email & password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already registered with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "SHOP_OWNER"
    });

    await user.save();

    const token = generateToken(user);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return successResponse(res, 201, {
      user: userWithoutPassword,
      token,
    });

  } catch (err) {
    next(err);
  }
};