const axios = require('axios');

const testDuplicate = async () => {
    const email = 'duplicate' + Date.now() + '@example.com';
    const payload = {
        name: 'Duplicate Test',
        email: email,
        password: 'password123'
    };

    try {
        console.log('Attempting first registration...');
        const res1 = await axios.post('http://localhost:5000/api/auth/register', payload);
        console.log('First Registration Success:', res1.data.user.email);

        console.log('Attempting second registration with same email...');
        const res2 = await axios.post('http://localhost:5000/api/auth/register', payload);
        console.log('Second Registration Success (UNEXPECTED):', res2.data);
    } catch (err) {
        if (err.response) {
            console.log('Second Registration Failed (EXPECTED):', err.response.status, err.response.data);
        } else {
            console.log('Error:', err.message);
        }
    }
};

testDuplicate();
