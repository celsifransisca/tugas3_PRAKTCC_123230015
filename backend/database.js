const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '34.172.113.167',
  user: 'admin',
  password: 'mypassword',
  database: 'notes_123230015'
});

db.connect((err) => {
  if (err) {
    console.error('Database gagal connect:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

module.exports = db;
