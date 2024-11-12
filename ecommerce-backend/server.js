require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'Lancebos';
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust based on frontend URL
  credentials: true
}));
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token is no longer valid
    req.user = user; // Attach user info to the request object
    next();
  });
};

// Register User
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login User with Password Comparison Logging
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('Entered Password:', password);  
    console.log('Stored Hashed Password:', user.password);  

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Protected route: Fetch user's cart
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await db.Cart.findOne({
      where: { userId: req.user.userId },
      include: db.Product,
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for the user.' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching cart.' });
  }
});

// Fetch all products (public route)
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.Product.findAll(); // Fetch all products from the database
    res.json(products); // Send products data back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products' });
  }
});

// Fetch a single product by ID (public route)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id); // Find product by primary key (ID)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product); // Send product data back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch product' });
  }
});

// Sync database models and start the server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

