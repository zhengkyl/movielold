import User from "../models/User.mjs";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const respondSignedToken = (res, userId) =>
  jwt.sign(
    { user: { id: userId } },
    process.env.jwtSecret,
    {
      expiresIn: 3600,
    },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    }
  );

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  try {
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    respondSignedToken(res, user._id);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Unknown server error" });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    respondSignedToken(res, newUser._id);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Unknown server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const rawUser = await User.findById(req.user.id);
    if (!rawUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only return specified fields
    const user = {
      name: rawUser.name,
      email: rawUser.email,
    };
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Unknown server error" });
  }
};
