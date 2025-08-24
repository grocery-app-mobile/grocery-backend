import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, type: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    type: "branch"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15d' });
};

export const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    type: "branch"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
};

