const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('asi.db');

// Replace 'users_json_file.json' and 'cards_json_file.json' with actual values
const usersJsonFile = require('./users.json');
const cardsJsonFile = require('./cards.json');
const userCardsJsonFile = require('./user_cards.json');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS user_cards");
    db.run("DROP TABLE IF EXISTS cards");
    db.run("DROP TABLE IF EXISTS users");
  // Create users table
  const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surname TEXT,
    last_name TEXT,
    login TEXT,
    password TEXT,
    image TEXT,
    money INTEGER
  )`;

  db.run(createUsersTableQuery, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully.');

      // Insert data into users table
      const insertUsersDataQuery = `INSERT INTO users (id, surname, last_name, login, password, image, money) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const usersStmt = db.prepare(insertUsersDataQuery);

      usersJsonFile.users.forEach((user) => {
        usersStmt.run(user.id, user.surname, user.last_name, user.login, user.password, user.image, user.money);
      });

      usersStmt.finalize();
      console.log('Data inserted into users table successfully.');
    }
  });

  // Create cards table
  const createCardsTableQuery = `CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    energy INTEGER,
    hp INTEGER,
    defense INTEGER,
    attack INTEGER,
    value INTEGER,
    src TEXT
  )`;

  db.run(createCardsTableQuery, (err) => {
    if (err) {
      console.error('Error creating cards table:', err.message);
    } else {
      console.log('Cards table created successfully.');

      // Insert data into cards table
      const insertCardsDataQuery = `INSERT INTO cards (id, name, desc, energy, hp, defense, attack, value, src) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const cardsStmt = db.prepare(insertCardsDataQuery);

      cardsJsonFile.cards.forEach((card) => {
        cardsStmt.run(card.id, card.name, card.desc, card.energy, card.hp, card.defense, card.attack, card.value, card.src);
      });

      cardsStmt.finalize();
      console.log('Data inserted into cards table successfully.');
    }
  });
  // Create user_cards table with foreign keys and "for_sale" column
  const createUserCardsTableQuery = `CREATE TABLE IF NOT EXISTS user_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER,
    user_id INTEGER,
    for_sale BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(card_id) REFERENCES cards(id)
  )`;

  db.run(createUserCardsTableQuery, (err) => {
    if (err) {
      console.error('Error creating user_cards table:', err.message);
    } else {
      console.log('User_cards table created successfully.');

      // Insert data into user_cards table
      const insertUserCardsDataQuery = `INSERT INTO user_cards (id, card_id, user_id, for_sale) VALUES (?, ?, ?, ?)`;
      const userCardsStmt = db.prepare(insertUserCardsDataQuery);

      userCardsJsonFile.user_cards.forEach((userCard) => {
        userCardsStmt.run(userCard.id, userCard.card_id, userCard.user_id, userCard.for_sale);
      });

      userCardsStmt.finalize();
      console.log('Data inserted into user_cards table successfully.');
    }

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing the database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
});
