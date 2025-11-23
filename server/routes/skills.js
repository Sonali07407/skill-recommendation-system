const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const User = require('../models/User');

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a skill
router.post('/', async (req, res) => {
    try {
        const { name, category, relatedSkills } = req.body;
        let skill = new Skill({
            name,
            category,
            relatedSkills
        });
        await skill.save();
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Recommendations
router.post('/recommend', async (req, res) => {
    try {
        const { userId, targetRole } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Map roles to categories
        const roleCategoryMap = {
            'Frontend Developer': 'Frontend',
            'Backend Developer': 'Backend',
            'Full Stack Developer': ['Frontend', 'Backend'],
            'Data Scientist': 'Data Science',
            'Mobile Developer': 'Mobile',
            'DevOps Engineer': 'DevOps'
        };

        const targetCategory = roleCategoryMap[targetRole];
        let recommendations = [];

        if (targetCategory) {
            if (Array.isArray(targetCategory)) {
                // For Full Stack, get skills from both categories
                const skills = await Skill.find({ category: { $in: targetCategory } });
                recommendations = skills.filter(s => !user.currentSkills.includes(s.name));
            } else {
                const skills = await Skill.find({ category: targetCategory });
                recommendations = skills.filter(s => !user.currentSkills.includes(s.name));
            }
        } else {
            // Fallback: Recommend top skills
            recommendations = await Skill.find().limit(5);
        }

        res.json(recommendations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
