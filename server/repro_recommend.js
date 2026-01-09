const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const testRecommend = async () => {
    let connection;
    try {
        connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const user = await User.findOne({});
        if (!user) {
            console.log('No user found');
            return;
        }
        console.log(`Testing with user: ${user.email} (${user._id})`);

        const payload = {
            userId: user._id.toString(),
            targetRole: 'Frontend Developer'
        };

        const response = await fetch('http://localhost:5000/api/skills/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Recommendation Response Status:', response.status);
        console.log('Data:', JSON.stringify(data, null, 2));

    } catch (err) {
        console.log('Error:', err.message);
    } finally {
        if (connection) {
            await mongoose.connection.close();
        }
        process.exit(0);
    }
};

testRecommend();
