require('dotenv').config();
const mongoose = require('mongoose');
const Skill = require('./models/Skill');

const checkSkills = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const skills = await Skill.find({});
        console.log(`\nTotal skills in database: ${skills.length}\n`);

        if (skills.length === 0) {
            console.log('WARNING: No skills found in the database!');
        } else {
            // Group by category
            const categories = {};
            skills.forEach(skill => {
                if (!categories[skill.category]) {
                    categories[skill.category] = [];
                }
                categories[skill.category].push(skill.name);
            });

            console.log('Skills by Category:');
            Object.keys(categories).forEach(cat => {
                console.log(`  ${cat}: ${categories[cat].join(', ')}`);
            });
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkSkills();
