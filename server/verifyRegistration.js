require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const verifyUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const users = await User.find({});
        console.log(`\nTotal users in database: ${users.length}\n`);

        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Created At: ${user.createdAt}`);
            console.log(`  Current Skills: ${user.currentSkills.length > 0 ? user.currentSkills.join(', ') : 'None'}`);
            console.log(`  Target Role: ${user.targetRole || 'Not set'}`);
            console.log('---');
        });

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

verifyUser();
