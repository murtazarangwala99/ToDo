// User Part Pending

const User = require("../models/userSchema");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) {
      throw new Error("Name and Email Both are Required !");
    }
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      newUser: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Email is Compulsory !");
    }
    const fetchUser = await User.findOne({ email });
    res.status(201).json({
      success: true,
      user: fetchUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
