const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json()); // Ensure this is present!

const users = [];
const SECRET_KEY = "test_secret";

const path = require('path');

// Serve login.html from the project root (✅ UPDATED)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// ✅ Signup Route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
    }

    users.push({ username, password });
    console.log("Users after signup:", users);  // 👀 Debugging line

    res.json({ message: "Signup successful" });
});


// ✅ Login Route
app.post('/login', (req, res) => {
    console.log("Users stored in memory:", users);  // 👀 Debugging line
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        console.log("❌ User not found or incorrect password!");  // Debugging log
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});



// ✅ Protected Route (optional)
app.get('/protected', (req, res) => {
    const token = req.headers.authorization;
    console.log("Received Token:", token);  // Debugging line

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);  // Extract token after "Bearer "
        res.json({ message: "Protected content", user: decoded.username });
    } catch (error) {
        console.log("Token Verification Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
});



// ✅ Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
