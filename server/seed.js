const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const skills = [
    // Frontend
    { name: 'React', category: 'Frontend', relatedSkills: ['JavaScript', 'HTML', 'CSS', 'Redux'] },
    { name: 'Angular', category: 'Frontend', relatedSkills: ['TypeScript', 'RxJS'] },
    { name: 'Vue.js', category: 'Frontend', relatedSkills: ['JavaScript', 'Vuex'] },
    { name: 'HTML', category: 'Frontend', relatedSkills: ['CSS', 'JavaScript'] },
    { name: 'CSS', category: 'Frontend', relatedSkills: ['HTML', 'Sass'] },

    // Backend
    { name: 'Node.js', category: 'Backend', relatedSkills: ['JavaScript', 'Express', 'MongoDB'] },
    { name: 'Express', category: 'Backend', relatedSkills: ['Node.js'] },
    { name: 'Django', category: 'Backend', relatedSkills: ['Python', 'SQL'] },
    { name: 'Spring Boot', category: 'Backend', relatedSkills: ['Java', 'SQL'] },
    { name: 'MongoDB', category: 'Backend', relatedSkills: ['Database', 'NoSQL'] },
    { name: 'PostgreSQL', category: 'Backend', relatedSkills: ['Database', 'SQL'] },

    // Data Science
    { name: 'Python', category: 'Data Science', relatedSkills: ['Pandas', 'NumPy', 'Scikit-learn'] },
    { name: 'Pandas', category: 'Data Science', relatedSkills: ['Python', 'Data Analysis'] },
    { name: 'NumPy', category: 'Data Science', relatedSkills: ['Python', 'Mathematics'] },
    { name: 'TensorFlow', category: 'Data Science', relatedSkills: ['Python', 'Machine Learning'] },
    { name: 'SQL', category: 'Data Science', relatedSkills: ['Database'] },

    // Mobile
    { name: 'React Native', category: 'Mobile', relatedSkills: ['React', 'JavaScript'] },
    { name: 'Flutter', category: 'Mobile', relatedSkills: ['Dart'] },
    { name: 'Swift', category: 'Mobile', relatedSkills: ['iOS'] },
    { name: 'Kotlin', category: 'Mobile', relatedSkills: ['Android'] },

    // DevOps
    { name: 'Docker', category: 'DevOps', relatedSkills: ['Containers', 'Linux'] },
    { name: 'Kubernetes', category: 'DevOps', relatedSkills: ['Docker', 'Orchestration'] },
    { name: 'Jenkins', category: 'DevOps', relatedSkills: ['CI/CD'] }
];

const seedDB = async () => {
    try {
        await Skill.deleteMany({});
        await Skill.insertMany(skills);
        console.log('Data Seeded');
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
