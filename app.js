const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins (for development purposes)

// Connect to SQLite database
const db = new sqlite3.Database('tours.db');

// Create schedule table if not exists
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS schedule (id INTEGER PRIMARY KEY, tourText TEXT)");
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Handle POST request to add tour entry
app.post('/addTourEntry', function(req, res) {
    const { tourText } = req.body;

    // Insert the tour text into the schedule table
    db.run('INSERT INTO schedule (tourText) VALUES (?)', [tourText], function(err) {
        if (err) {
            console.error('Failed to insert tour entry into the database:', err);
            res.status(500).send('Failed to insert tour entry into the database');
        } else {
            console.log('Tour entry added to the database successfully.');
            res.sendStatus(200);
        }
    });
});

// Start server
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});
