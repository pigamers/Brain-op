const express = require('express');
const router = express.Router();
const User = require('../models/Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send({ status: 'error', message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ status: 'error', message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { email: email, id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // Save token to user document in database
        user.token = token;
        await user.save();

        user.password = undefined;

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: 'User signup success',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;
