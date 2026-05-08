const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

// Rute ambil data (GET)
app.get('/notes', (req, res) => {
  db.query('SELECT * FROM notes ORDER BY tanggal_dibuat DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Rute tambah data (POST)
app.post('/notes', (req, res) => {
  const { judul, isi } = req.body;
  db.query('INSERT INTO notes (judul, isi) VALUES (?, ?)', [judul, isi], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ id: results.insertId, judul, isi });
  });
});

app.listen(3000, () => {
  console.log('🚀 Backend jalan di http://localhost:3000');
});