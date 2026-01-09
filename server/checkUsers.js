const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const users = await User.find({});
        console.log('Users found:', users.length);
        users.forEach(u => console.log(`- ${u.email} (${u._id})`));

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

checkUsers();
