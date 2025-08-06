/*require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/*connection.connect(err => {
  if (err) return console.error('DB connect failed:', err.message);
  console.log('✅ MySQL connected');
});*/


/*connection.connect(err => {
  if (err) {
    console.error('DB connect failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Database connected successfully');
});

module.exports = connection; */



/*const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect(err => {
  if (err) {
    console.error('DB connect failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Database connected successfully');
}); */


// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('✅ DB connected, test result:', rows[0].solution);
  } catch (err) {
    console.error('❌ DB initial connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();

module.exports = pool;











