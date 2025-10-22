const user = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../utils/asyncHandler');

// Login User
const loginUser = catchAsyncErrors(async (req, res) => {
    const { phone, password } = req.body;
    const existingUser = await user.findOne({ phone });
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }               
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
});


// Register User
const registerUser = catchAsyncErrors(async (req, res) => {
    const { fullName, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ fullName, phone, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

module.exports = {
    loginUser,
    registerUser
};
