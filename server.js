const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database("./players.db");

db.run(`
CREATE TABLE IF NOT EXISTS players (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
position TEXT,
number INTEGER
)
`);

db.run(
  `INSERT INTO players (name, position, number) VALUES ('Harry Kane', 'Striker', 9)`,
);
db.run(
  `INSERT INTO players (name, position, number) VALUES ('Jude Bellingham', 'Midfielder', 22)`,
);
db.run(
  `INSERT INTO players (name, position, number) VALUES ('Kyle Walker', 'Defender', 2)`,
);

app.get("/players", (req, res) => {
  db.all("SELECT * FROM players", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/players", (req, res) => {
  const { name, position, number } = req.body;
  db.run(
    "INSERT INTO players (name, position, number) VALUES (?, ?, ?)",
    [name, position, number],
    function (err) {
      res.json({ id: this.lastID });
    },
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
