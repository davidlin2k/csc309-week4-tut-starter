const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

// Example user table creation
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin123')");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Vulnerable login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log("Executing query:", query); // For demonstration purposes

  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (row) {
      return res.send("Login successful!");
    } else {
      return res.send("Invalid credentials");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
