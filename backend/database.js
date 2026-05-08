const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '34.9.89.175', 
  user: 'admin',
  password: 'tugas2',
  database: 'notes_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error koneksi database:', err);
    return;
  }
  console.log('FIX! INI UDAH KONTAK KE DATABASE CLOUD GCP (34.9.89.175)!');
});

module.exports = db;