const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate username (email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return res.send('Please enter a valid email address!');
    }

    // Validate password (uppercase letter, number, allowed special characters)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]+$/;
    if (!passwordRegex.test(password)) {
        return res.send('Password requirements not met!');
    }

    // Check if the entered password matches the predefined password
    if (password === 'SmartServTest@123') {
        return res.redirect('/dashboard.html');
    } else {
        return res.send('Incorrect password!');
    }
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});