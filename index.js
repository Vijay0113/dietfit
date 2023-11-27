const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// SQLite setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'), // Change the database file path
});

// Define the User model
const User = sequelize.define('User', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  password: DataTypes.STRING,
});

// Sync the model with the database
sequelize.sync();

app.set('port', process.env.PORT || 5000);

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home Page HTML.html'));
});

// Registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/register', async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    await User.create({
      first_name,
      last_name,
      email,
      phone,
      password,
    });

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed. Please try again.');
  }
});

// Checkout page
app.post('/checkout', async (req, res) => {
  // Your checkout logic here using the User model
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email, password },
    });

    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login. Please try again.');
  }
});

// Define a route for the registration page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkoutdeetails.html'));
});
app.post('/checkout', async (req, res) => {
  const {
    name,
    address,
    email,
    locality_apartment,
    pincode,
    contact_no,
    date,
    time_slot
  } = req.body;

  try {
    const user = await User.create({
      name,
      address,
      email,
      locality_apartment,
      pincode,
      contact_no,
      date,
      time_slot,
    });

    // You can also perform additional actions here if needed

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Submission failed. Please try again.');
  }
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Feedback Form HTML.html'));
});

app.get('/aboutus', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'About Us HTML.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
