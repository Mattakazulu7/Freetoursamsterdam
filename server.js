const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Create or connect to SQLite database
const db = new sqlite3.Database('tours.db');

// Create 'bookings' table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tour TEXT,
        date TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        language TEXT,
        num_people INTEGER
    )`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle form submissions
app.post('/submit-booking', (req, res) => {
    const { tour, date, name, email, phone, language, num_people } = req.body;
    db.run(`INSERT INTO bookings (tour, date, name, email, phone, language, num_people) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [tour, date, name, email, phone, language, num_people], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).send('Booking Submitted Successfully');
            }
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
