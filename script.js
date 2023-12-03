var timer = null;
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    clearTimeout(timer);
    if (window.pageYOffset == 0) {
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

function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    // Hier kannst du die Reservierungsinformationen an den Server senden und in der Datenbank speichern
    // Beispiel: Du könntest dazu AJAX oder Fetch API verwenden
    alert(`Raum ${roomSelect} am ${date} reserviert.`);
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

function rescheduleReservation() {
    var newDate = document.getElementById("new-date").value;

    // Hier könntest du die Terminverschiebungsinformationen an den Server senden und in der Datenbank aktualisieren
    // Beispiel: Du könntest dazu AJAX oder Fetch API verwenden
    alert("Termin verschoben auf: " + newDate);
}