const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens

const app = express();

const db = new sqlite3.Database('your-database-file.db'); // Change 'your-database-file.db' to your desired database file name

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // Parse JSON bodies

// Create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS delivery_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  address TEXT,
  phone_number TEXT,
  special_request TEXT
)`);

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'User registered successfully' });
  });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token and send it in the response
      const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid password' });
    }
  });
});

// Save delivery details route
app.post('/api/save-delivery-details', (req, res) => {
  const { name, address, phoneNumber, specialRequest } = req.body;

  db.run('INSERT INTO delivery_details (name, address, phone_number, special_request) VALUES (?, ?, ?, ?)',
    [name, address, phoneNumber, specialRequest],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, message: 'Delivery details saved successfully' });
    }
  );
});

// ... (remaining code)

app.listen(app.get('port'), () => {
  console.log(`Node app is running at localhost:${app.get('port')}`);
});
