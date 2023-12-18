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

document.getElementById("reserveButton").addEventListener("click", (reserveRoom));
/*
function saveAsJSON() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    var reservationData = {
        room: roomSelect,
        date: date
    };

    // JSON-Datei erstellen und herunterladen
    const jsonData = JSON.stringify(reservationData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservation_data.json';
    a.click();
    URL.revokeObjectURL(url);
}
*/




function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    var reservationData = {
        room: roomSelect,
        date: date,
    };



 /*   const endpointURL = 'http://localhost:63342/M290/package.json'; // Die URL des Endpunkts
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
        .then(data => {
            if (data) {
                alert('Reservierung erfolgreich gespeichert!');
            }
        })
        .catch(error => {
            console.error('There was a problem with the reservation:', error);
        });
}

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

function loadComments() {
    var commentList = document.getElementById("comment-list");
    var comments = ["Toller Raum!", "Gut für Besprechungen."];

    comments.forEach(function (comment) {
        var li = document.createElement("li");
        li.textContent = comment;
        commentList.appendChild(li);
    });
}

function rescheduleReservation() {
    var newDate = document.getElementById("new-date").value;
    alert("Termin verschoben auf: " + newDate);
}
