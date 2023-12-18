const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());

/* Konfiguration für die Verbindung zur Datenbank
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ersetzen Sie benutzername durch Ihren Datenbank-Benutzernamen
    password: 'Yav26741', // Ersetzen Sie passwort durch Ihr Datenbank-Passwort
    database: 'BZZ_Immo'
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ' + err.stack);
        return;
    }
    console.log('Erfolgreich mit der Datenbank verbunden');
});

//Handler für das Formular-POST
app.post('/M290/data.json', (req, res) => {
    const id = req.body.id;
    const room = req.body.room;
    const date = req.body.date;

    const sql = 'INSERT INTO BZZ_Immo.Reservierungen (id, room, date) VALUES (?, ?, ?)';
    connection.query(sql, [id, room, date], (error) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten: ' + error.message);
            return res.status(500).send('Fehler beim Einfügen der Daten');
        }
        res.status(200).send('Raum erfolgreich reserviert');
    });
});

// Server starten
app.listen(63342, () => {
    console.log('Server läuft auf Port 63342');
});

const fs = require('fs');

// Beispielinhalt für id, room und date
const content = {
    id: 1,
    room: 'classroom',
    date: '2023-12-31'
};



*/
const fs = require('fs');

// Lese JSON-Daten aus der Datei
const jsonData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(jsonData);

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yav26741',
    database: 'BZZ_Immo'
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
        return;
    }
    console.log('Verbunden mit der Datenbank.');

    // Beispiel für eine SQL-Abfrage, um Daten einzufügen
    const sql = 'INSERT INTO BZZ_Immo.Reservierungen (id, room, date) VALUES ?'; // Spalten anpassen

    const values = data.map(item => [item.id, item.room, item.date]); // Felder anpassen

    // Daten in die Tabelle einfügen
    connection.query(sql, [values], (err) => {
        if (err) {
            console.error('Fehler beim Einfügen von Daten:', err);
            return;
        }
        console.log('Daten erfolgreich eingefügt.');
        connection.end(); // Verbindung schließen
    });
});
