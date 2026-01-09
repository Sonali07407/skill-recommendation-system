const axios = require('axios');

const testRegister = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Agent',
            email: 'testagent' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log('Registration Success:', res.data);
    } catch (err) {
        if (err.response) {
            console.log('Registration Failed:', err.response.status, err.response.data);
        } else {
            console.log('Registration Failed:', err.message);
        }
    }
};

testRegister();
