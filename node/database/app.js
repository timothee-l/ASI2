const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5103;

// Database connection
const db = new sqlite3.Database('asi.db');

app.use(bodyParser.json());
app.use(cookieParser());

// Middleware to check authentication
const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.clearCookie('token');
    return res.sendStatus(401);
  }

  db.get('SELECT * FROM users WHERE id = ?', [token], (err, row) => {
    if (err || !row) {
      res.clearCookie('token');
      return res.sendStatus(401);
    }
    next();
  });
};

//TODO: Split auth and db in two different services

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE login = ? AND password = ?', [username, password], (err, row) => {
    if (err || !row) {
      return res.sendStatus(401);
    }

    res.cookie('token', row.id.toString(), { httpOnly: true });
    res.json({ userId: row.id });
  });
});

// Protected endpoint
app.get('/auth/user', authenticate, (req, res) => {
  const userId = parseInt(req.cookies.token);
  res.json({ userId });
});

// Logout endpoint
app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

// ------------------------------------------------------------------------------------

app.post('/db/register', (req, res) => {
  const { surname, last_name, login, password, image, money } = req.body;
  const stmt = db.prepare('INSERT INTO users (surname, last_name, login, password, image, money) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(surname, last_name, login, password, image, money, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ userId: this.lastID });
  });

  stmt.finalize();
});

app.get('/db/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM users WHERE id = ?`;

  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(row);
    }
  });
});

app.get('/db/user/:userId/cards', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT cards.*
    FROM user_cards
    JOIN cards ON user_cards.card_id = cards.id
    WHERE user_cards.user_id = ?`;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/db/cards/for-sale', (req, res) => {
  const query = `
    SELECT user_cards.*, cards.*
    FROM user_cards
    JOIN cards ON user_cards.card_id = cards.id
    WHERE user_cards.for_sale = 1`;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
