const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  db.query(
    'SELECT * FROM notes ORDER BY tanggal_dibuat DESC',
    (err, results) => {
      if (err) return res.status(500).send(err);

      res.json(results);
    }
  );
});


// GET semua notes
app.get('/notes', (req, res) => {
  db.query(
    'SELECT * FROM notes ORDER BY tanggal_dibuat DESC',
    (err, results) => {
      if (err) return res.status(500).send(err);

      res.json(results);
    }
  );
});



// POST tambah note
app.post('/notes', (req, res) => {
  const { judul, isi } = req.body;

  db.query(
    'INSERT INTO notes (judul, isi) VALUES (?, ?)',
    [judul, isi],
    (err, results) => {
      if (err) return res.status(500).send(err);

      res.json({
        id: results.insertId,
        judul,
        isi
      });
    }
  );
});



// PUT update note
app.put('/notes/:id', (req, res) => {
  const { judul, isi } = req.body;
  const id = req.params.id;

  db.query(
    'UPDATE notes SET judul=?, isi=? WHERE id=?',
    [judul, isi, id],
    (err, results) => {
      if (err) return res.status(500).send(err);

      res.json({
        message: 'Note updated'
      });
    }
  );
});



// DELETE note
app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM notes WHERE id=?',
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);

      res.json({
        message: 'Note deleted'
      });
    }
  );
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});