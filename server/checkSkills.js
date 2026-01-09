const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config();

const checkSkills = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const skills = await Skill.find({});
        console.log('Skills found:', skills.length);
        skills.forEach(s => console.log(`- ${s.name} (${s.category})`));

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

checkSkills();
