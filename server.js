const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(sql, [name, email], (err, results) => {
    if (err) {
      console.error('Query failed:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true, id: results.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
}); 



