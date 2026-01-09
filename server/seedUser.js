const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const email = 'test@example.com';
        const password = 'password123';

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists, deleting...');
            await User.deleteOne({ email });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name: 'Test User',
            email,
            password: hashedPassword
        });

        await user.save();
        console.log(`User created: ${email} / ${password}`);

        const users = await User.find({});
        console.log('All Users in DB:');
        users.forEach(u => console.log(`- ${u.email} (${u._id})`));

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seedUser();
