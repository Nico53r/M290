const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());


app.listen(63342, () => {
    console.log('Server läuft auf Port 63342');
});

/*
const fs = require('fs');

const jsonData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(jsonData);
*/

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yav26741',
    database: 'BZZ_Immo'
});
/*

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
        return;
    }
    console.log('Verbunden mit der Datenbank.');



    const sql = 'INSERT INTO BZZ_Immo.Reservierungen (room, date, schueler_id) VALUES ?';

    const values = data.map(item => [item.room, item.date, item.schueler_id]);

    connection.query(sql, [values], (err) => {
        if (err) {
            console.error('Fehler beim Einfügen von Daten:', err);
            return;
        }
        console.log('Daten erfolgreich eingefügt.');
        connection.end();
    });
});
*/
app.post('/insertReservation', (req, res) => {
    const { room, date, schueler_id } = req.body;

    const insertQuery = 'INSERT INTO Reservierungen (room, date, schueler_id) VALUES (?, ?, 0)';
    connection.query(insertQuery, [room, date, schueler_id], (error) => {
        if (error) {
            console.error('Fehler beim Einfügen von Daten:', error);
            res.status(500).json({ error: 'Fehler beim Einfügen von Daten in die Datenbank' });
            return;
        }
        res.status(200).json({ message: 'Daten erfolgreich in die Datenbank eingefügt' });
    });
});