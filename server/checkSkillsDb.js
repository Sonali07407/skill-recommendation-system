const mongoose = require('mongoose');
require('dotenv').config();
const Skill = require('./models/Skill');
const User = require('./models/User');

const checkData = async () => {
    try {
        const fs = require('fs');
        let output = '';

        await mongoose.connect(process.env.MONGO_URI);
        output += 'Connected to DB\n';

        const skillCount = await Skill.countDocuments();
        output += `Total Skills: ${skillCount}\n`;

        if (skillCount > 0) {
            const sampleSkill = await Skill.findOne();
            output += `Sample Skill: ${JSON.stringify(sampleSkill)}\n`;
        } else {
            output += 'No skills found\n';
        }

        const users = await User.find().limit(1);
        if (users.length > 0) {
            output += `Sample User: ${JSON.stringify(users[0])}\n`;
        } else {
            output += 'No users found\n';
        }

        fs.writeFileSync('db_check_result.txt', output);
        console.log('Check complete, results written to db_check_result.txt');

    } catch (err) {
        console.error(err);
        require('fs').writeFileSync('db_check_result.txt', `Error: ${err.message}`);
    } finally {
        mongoose.connection.close();
    }
};

checkData();
