//Import Modules
const express = require('express');
const bcrypt = require('bcrypt');

//Import from Files
const { validateEmail, validateLength, validateUsername } = require('../helpers/validation');
const User = require('../models/User');
const { removeSpaces } = require('../helpers/helpers');

// Create Router
const router = express.Router();

router.post('/register', async (req, res, next) => {

    const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } = req.body;

    try {
        // Validate Email Id
        if (!validateEmail(email)) {
            return res.status(400).json({
                message: 'Invalid Email Id'
            })
        }

        // Get User From Database
        const checkEmail = await User.findOne({ email });

        // Check User
        if (checkEmail) {
            return res.status(400).json({
                message: 'This email is already in exist please try  with another email address'
            })
        }

        // Validate First Name
        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: 'First name must be between 3 and 30 characters'
            })
        }

        // Validate Last Name
        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: 'Last name must be between 3 and 30 characters'
            })
        }

        // Validate Password
        if (!validateLength(password, 6, 40)) {
            return res.status(400).json({
                message: 'Password must be between 6 and 40 characters'
            })
        }

        // bycryptPassword
        const bycryptPassword = await bcrypt.hash(password, 12);

        // Get Username
        const tempUsername = removeSpaces(first_name + last_name);

        const newUsername = await validateUsername(tempUsername);

        // Add New User
        const user = await new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: newUsername,
            password: bycryptPassword,
            bYear: bYear,
            bMonth: bMonth,
            bDay: bDay,
            gender: gender
        }).save();

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;