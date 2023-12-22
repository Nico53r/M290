const mysql = require('mysql2');
const express = require('express');
/*const fs = require('fs');*/
const path = require('path');

const app = express();
app.use(express.json());

app.use('/M290', express.static(path.join(__dirname)));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yav26741',
    database: 'BZZ_Immo'
});

app.post('/insertData', (req, res) => {
    const reservationData = req.body;
    /*const jsonData = fs.readFileSync('data.json', 'utf8');
    const data = JSON.parse(jsonData);*/

    const sql = 'INSERT INTO BZZ_Immo.Reservierungen (room, date, schueler_id) VALUES (?, ?, ?)';
    const values = [reservationData.room, reservationData.date, reservationData.schueler_id];

    connection.query(sql, [values], (err) => {
        if (err) {
            console.error('Fehler beim Einfügen von Daten:', err);
            res.status(500).send('Fehler beim Einfügen von Daten in die Datenbank');
            return;
        }
        console.log('Daten erfolgreich eingefügt.');
        res.status(200).send('Daten erfolgreich eingefügt.');
    });
});

app.listen(63342, () => {
    console.log('Server läuft auf Port 63342');
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
