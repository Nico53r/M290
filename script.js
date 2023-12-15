window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    clearTimeout(timer);
    if (window.scrollY <= 5) {
        header.classList.remove("fade-out");
        header.classList.add("fade-in");
    } else {
        header.classList.remove("fade-in");
        header.classList.add("fade-out");
        timer = setTimeout(function() {
            header.classList.remove("fade-out");
        }, 500);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    showRoomDetails();
    loadComments();
});

function showRoomDetails() {
    var roomSelect = document.getElementById("room");
    var roomInfo = document.getElementById("room-info");

    switch (roomSelect.value) {
        case "classroom":
            roomInfo.textContent = "Klassenzimmer - Kapazität: 25 Personen";
            break;
        case "it-room":
            roomInfo.textContent = "IT-Zimmer - Kapazität: 25 Personen";
            break;
        case "sports-hall":
            roomInfo.textContent = "Sporthalle - Kapazität: 25-50 Personen";
            break;
        default:
            roomInfo.textContent = "Bitte wähle einen Raum aus.";
            break;
    }
}
/*
function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    // Hier kannst du die Reservierungsinformationen an den Server senden und in der Datenbank speichern
    // Beispiel: Du könntest dazu AJAX oder Fetch API verwenden
    alert(`Raum ${roomSelect} am ${date} reserviert.`);
}



document.getElementById("reserveButton").addEventListener("click", reserveRoom);

function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;
    alert(`Raum ${roomSelect} am ${date} reserviert.`);
}
*/

document.getElementById("reserveButton").addEventListener("click", reserveRoom);

function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    var reservationData = {
        room: roomSelect,
        date: date
    };


/*
    const endpointURL = 'http://localhost:63342/M290/data.json'; // Die URL des Endpunkts
*/

    fetch('/M290/data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
    /*   .then(data => {
           // Hier könntest du auf die Antwort des Servers reagieren
           alert('Reservierung erfolgreich gespeichert!');
       })
       .catch(error => {
           // Hier könntest du auf Fehler reagieren
           console.error('There was a problem with the reservation:', error);
       });*/
}


/*
function addComment() {
    var commentText = document.getElementById("comment-text").value;
    var commentList = document.getElementById("comment-list");

    if (commentText.trim() !== "") {
        var li = document.createElement("li");
        li.textContent = commentText;
        commentList.appendChild(li);
        document.getElementById("comment-text").value = "";
    }
}
*/
function loadComments() {
    // Hier könntest du die Kommentare aus einer Datenbank laden und anzeigen
    // Beispiel: Annahme, dass es bereits Kommentare gibt
    var commentList = document.getElementById("comment-list");
    var comments = ["Toller Raum!", "Gut für Besprechungen."];

    comments.forEach(function (comment) {
        var li = document.createElement("li");
        li.textContent = comment;
        commentList.appendChild(li);
    });
}
/*
function rescheduleReservation() {
    var newDate = document.getElementById("new-date").value;

    // Hier könntest du die Terminverschiebungsinformationen an den Server senden und in der Datenbank aktualisieren
    // Beispiel: Du könntest dazu AJAX oder Fetch API verwenden
    alert("Termin verschoben auf: " + newDate);
}
*/


const fs = require('fs');
const mysql = require('mysql');

// JSON-Datei lesen
const jsonData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(jsonData);

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yav26741',
    database: 'BZZ_Immo'
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur Datenbank:', err);
        return;
    }
    console.log('Verbunden zur Datenbank.');


    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Tabelle:', err);
            return;
        }
        console.log('Tabelle erstellt oder vorhanden.');

        // Füge Daten aus der JSON-Datei in die Tabelle ein
        data.forEach((entry) => {
            const insertQuery = 'INSERT INTO Reservierungen (id, room, date) VALUES (?, ?, ?)';
            const values = [entry.id, entry.room, entry.date];

            connection.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Fehler beim Einfügen der Daten:', err);
                    return;
                }
                console.log('Daten erfolgreich eingefügt:', result);
            });
        });
    });
});
