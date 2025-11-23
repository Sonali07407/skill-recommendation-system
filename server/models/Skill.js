const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String }, // e.g., "Frontend", "Backend", "DevOps"
    relatedSkills: [{ type: String }] // Skills that are often learned together or are prerequisites
});

module.exports = mongoose.model('Skill', SkillSchema);
