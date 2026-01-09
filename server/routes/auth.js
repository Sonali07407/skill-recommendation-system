const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    let registrationEmail = 'unknown';
    try {
        const { name, email, password } = req.body;
        registrationEmail = email;
        console.log(`Register attempt for email: ${email}`);

        let user = await User.findOne({ email });
        if (user) {
            console.log(`Registration failed: User already exists with email: ${email}`);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        console.log(`User registered successfully: ${email}`);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    console.error(`JWT Sign Error during registration for ${email}:`, err);
                    throw err;
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        console.error(`Registration error for ${registrationEmail}:`, err.message);
        const fs = require('fs');
        fs.appendFileSync('server.log', `${new Date().toISOString()} - Registration Error: ${err.message}\n${err.stack}\n`);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: '${email}' (Length: ${email.length})`);
        for (let i = 0; i < email.length; i++) {
            console.log(`Char ${i}: ${email.charCodeAt(i)}`);
        }

        let user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User not found for email: ${email}`);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for email: ${email}`);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        const fs = require('fs');
        fs.appendFileSync('server.log', `${new Date().toISOString()} - Error: ${err.message}\n${err.stack}\n`);
        res.status(500).send('Server error');
    }
});

module.exports = router;
